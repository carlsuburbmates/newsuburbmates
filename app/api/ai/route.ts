import OpenAI from "openai"; import { NextResponse } from "next/server";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY!, organization: process.env.OPENAI_ORG_ID, project: process.env.OPENAI_PROJECT_ID });
export async function POST(){ const r = await client.responses.create({ model:"gpt-5", input:"pong" }); return NextResponse.json({ ok: !!r.output }); }
