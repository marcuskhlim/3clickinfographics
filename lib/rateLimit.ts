// Tiny per-IP counter for "free generations before BYOK".
//
// Default: in-memory Map. Resets on cold-start. Doesn't sync across regions.
// Good enough for low-traffic free tools, but a determined abuser can bypass
// via IP rotation.
//
// Production: set KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV / Upstash) to
// use a shared store. No code change required.

const memory = new Map<string, { count: number; firstSeen: number }>();

const WINDOW_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const FREE_LIMIT = Number(process.env.INFOFORGE_FREE_GENERATIONS ?? "2");

export const FREE_GENERATIONS_LIMIT = FREE_LIMIT;

const useUpstash = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function kv(method: "GET" | "POST", cmd: string[]) {
  const r = await fetch(`${process.env.KV_REST_API_URL}/${cmd.join("/")}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`KV ${cmd[0]} failed: ${r.status}`);
  return r.json() as Promise<{ result: unknown }>;
}

export async function getUsage(ip: string): Promise<{ used: number; limit: number; remaining: number }> {
  let used = 0;
  if (useUpstash) {
    const r = await kv("GET", ["get", `if:${ip}`]);
    used = Number(r.result ?? 0);
  } else {
    const v = memory.get(ip);
    if (v && Date.now() - v.firstSeen < WINDOW_MS) used = v.count;
  }
  return { used, limit: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - used) };
}

export async function consume(ip: string): Promise<{ used: number; limit: number; remaining: number }> {
  if (useUpstash) {
    const r = await kv("POST", ["incr", `if:${ip}`]);
    const used = Number(r.result ?? 0);
    if (used === 1) await kv("POST", ["expire", `if:${ip}`, String(Math.floor(WINDOW_MS / 1000))]);
    return { used, limit: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - used) };
  }
  const now = Date.now();
  const cur = memory.get(ip);
  const fresh = !cur || now - cur.firstSeen >= WINDOW_MS;
  const next = { count: fresh ? 1 : cur!.count + 1, firstSeen: fresh ? now : cur!.firstSeen };
  memory.set(ip, next);
  return { used: next.count, limit: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - next.count) };
}

export function ipFromRequest(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}
