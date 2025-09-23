import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Image from "@/models/Image";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title") || "Untitled";
  const tagsRaw = formData.get("tags") || "";
  const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replace(/\s+/g, "_");
  const filePath = path.join(process.cwd(), "public", "gallery", filename);

  try {
    await writeFile(filePath, buffer);
    await connectDB();
    const image = await Image.create({ filename, title, tags });
    return NextResponse.json({ success: true, filename: image.filename });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}