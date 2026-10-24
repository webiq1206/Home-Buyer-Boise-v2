import { readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { hideUnverifiedLlms } from "@/lib/llmsTrust";

export async function GET() {
  const raw = readFileSync(path.join(process.cwd(), "content", "llms-full.txt"), "utf8");
  return new NextResponse(hideUnverifiedLlms(raw), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
