import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import Image from "@/models/Image";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("file");

  if (!filename) {
    return new Response(JSON.stringify({ error: "No filename provided" }), {
      status: 400,
    });
  }

  const filePath = path.join(process.cwd(), "public", "gallery", filename);

  try {
    // Try deleting file only if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await connectDB();
    await Image.deleteOne({ filename });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return new Response(JSON.stringify({ error: "Delete failed" }), {
      status: 500,
    });
  }
}