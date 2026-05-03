import { NextRequest, NextResponse } from "next/server";
import { ASPECTS, buildPrompt } from "@/lib/presets";

export const runtime = "nodejs";
export const maxDuration = 120;

const UPSTREAM_URL = "https://stealthcommandcenter.com/members/infographicideas2";
const UPSTREAM_ORIGIN = "https://stealthcommandcenter.com";
const COOKIE = "id=1; e=anything";

type Body = {
  topic: string;
  research?: string;
  styleId: string;
  modifierId?: string;
  aspectId: string;
};

function extractJobId(html: string): string | null {
  const m = html.match(/window\.location\.href\s*=\s*["']\?id=([^"'&]+)/i);
  return m ? m[1] : null;
}

function extractResultImage(html: string): string | null {
  const re = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const src = m[1];
    if (src.includes("/images/logo.png")) continue;
    if (src.startsWith("data:image")) return src;
    return src;
  }
  return null;
}

function absUrl(src: string): string {
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
  if (src.startsWith("/")) return UPSTREAM_ORIGIN + src;
  return `${UPSTREAM_ORIGIN}/members/${src}`;
}

async function fetchAsDataUrl(url: string): Promise<string | null> {
  if (url.startsWith("data:")) return url;
  const r = await fetch(url, { headers: { Cookie: COOKIE } });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "image/png";
  const buf = Buffer.from(await r.arrayBuffer());
  return `data:${ct};base64,${buf.toString("base64")}`;
}

async function pollForImage(jobId: string, deadline: number): Promise<string | null> {
  const url = `${UPSTREAM_URL}?id=${encodeURIComponent(jobId)}`;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 3000));
    const r = await fetch(url, { headers: { Cookie: COOKIE } });
    if (!r.ok) continue;
    const html = await r.text();
    if (/Image Generation in Progress/i.test(html)) continue;
    const src = extractResultImage(html);
    if (src) return absUrl(src);
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;
  if (!body?.topic || !body?.styleId || !body?.aspectId) {
    return NextResponse.json({ error: "topic, styleId and aspectId are required" }, { status: 400 });
  }

  const aspect = ASPECTS.find((a) => a.id === body.aspectId);
  if (!aspect) return NextResponse.json({ error: `Unknown aspect: ${body.aspectId}` }, { status: 400 });

  const prompt = buildPrompt(body);
  const deadline = Date.now() + 110_000;

  try {
    const formBody = new URLSearchParams({ size: aspect.id, prompt, submit: "GENERATE IMAGE" }).toString();
    const resp = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": COOKIE,
      },
      body: formBody,
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json(
        { error: `Upstream ${resp.status}: ${errText.slice(0, 500)}`, prompt, size: aspect.id },
        { status: 502 }
      );
    }

    const html = await resp.text();
    const jobId = extractJobId(html);
    if (!jobId) {
      const inlineImg = extractResultImage(html);
      if (inlineImg) {
        const dataUrl = await fetchAsDataUrl(absUrl(inlineImg));
        if (dataUrl) return NextResponse.json({ prompt, size: aspect.id, image: dataUrl });
      }
      return NextResponse.json(
        { error: "Could not find job id or image in upstream response.", prompt, size: aspect.id },
        { status: 502 }
      );
    }

    const imgSrc = await pollForImage(jobId, deadline);
    if (!imgSrc) {
      return NextResponse.json(
        { error: "Image generation timed out.", prompt, size: aspect.id, jobId },
        { status: 504 }
      );
    }

    const dataUrl = await fetchAsDataUrl(imgSrc);
    if (!dataUrl) {
      return NextResponse.json({ prompt, size: aspect.id, image: imgSrc, jobId });
    }
    return NextResponse.json({ prompt, size: aspect.id, image: dataUrl, jobId });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message, prompt, size: aspect.id }, { status: 502 });
  }
}
