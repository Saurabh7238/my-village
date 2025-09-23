import { connectDB } from "@/lib/db";
import Image from "@/models/Image";

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ uploadedAt: -1 });
  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" },
  });
}