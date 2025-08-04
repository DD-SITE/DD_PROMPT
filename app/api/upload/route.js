export const runtime = "nodejs";

import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);

    console.log("✅ Using route.js for /api/upload");
    return NextResponse.json({ extractedText: data.text.trim() });
  } catch (error) {
    console.error("PDF parse failed:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
