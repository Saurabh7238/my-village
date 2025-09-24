import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const metaFilePath = path.join(process.cwd(), 'data', 'gallery.json');
  try {
    const fileContent = await fs.readFile(metaFilePath, 'utf-8');
    const images = JSON.parse(fileContent);
    return NextResponse.json(images);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ images: [] });
    }
    console.error("Failed to read gallery metadata:", error);
    return NextResponse.json({ error: 'Failed to read image data' }, { status: 500 });
  }
}