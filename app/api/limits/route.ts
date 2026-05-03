import { NextRequest, NextResponse } from "next/server";
import { getUsage, ipFromRequest } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const ip = ipFromRequest(req);
  const usage = await getUsage(ip);
  const sharedKeyAvailable = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({ ...usage, sharedKeyAvailable });
}
