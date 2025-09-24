import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const title = formData.get('title') || '';
  const tags = formData.get('tags') || '';

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const publicDir = path.join(process.cwd(), 'public', 'gallery');
  const filePath = path.join(publicDir, file.name);

  try {
    await fs.mkdir(publicDir, { recursive: true });
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));
    
    // Save image metadata to a JSON file
    const metaFilePath = path.join(process.cwd(), 'data', 'gallery.json');
    let metadata = [];
    try {
      const existingData = await fs.readFile(metaFilePath, 'utf-8');
      metadata = JSON.parse(existingData);
    } catch (e) {
      console.warn('Gallery metadata file not found or invalid, creating a new one.');
    }

    const newImage = {
      filename: file.name,
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      uploadedAt: new Date().toISOString()
    };
    metadata.push(newImage);
    await fs.writeFile(metaFilePath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({ message: 'File uploaded successfully!', filename: file.name });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}