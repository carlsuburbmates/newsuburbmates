import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
  try {
    const r = await pool.query("select 1 as ok");
    return NextResponse.json({ ok: r.rows[0].ok === 1 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message });
  }
}
