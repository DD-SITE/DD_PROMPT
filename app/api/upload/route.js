export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // You can do something with the buffer here if needed
    console.log("✅ File received at /api/upload");

    return NextResponse.json({
      message: "File uploaded successfully. PDF parsing is disabled.",
    });
  } catch (error) {
    console.error("File handling failed:", error);
    return NextResponse.json({ error: "Failed to handle file" }, { status: 500 });
  }
}
