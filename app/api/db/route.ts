import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch(process.env.DATABASE_URL!, { method:"HEAD" }).catch(()=>null);
  return NextResponse.json({ ok: !!res, env: !!process.env.DATABASE_URL });
}
