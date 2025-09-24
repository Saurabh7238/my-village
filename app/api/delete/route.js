import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ error: 'Missing file name parameter' }, { status: 400 });
  }

  const publicFilePath = path.join(process.cwd(), 'public', 'gallery', fileName);
  const metaFilePath = path.join(process.cwd(), 'data', 'gallery.json');

  try {
    // Delete the file from the public folder
    await fs.unlink(publicFilePath);

    // Update the metadata file
    const existingData = await fs.readFile(metaFilePath, 'utf-8');
    const metadata = JSON.parse(existingData);
    const updatedMetadata = metadata.filter(img => img.filename !== fileName);
    await fs.writeFile(metaFilePath, JSON.stringify(updatedMetadata, null, 2));

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file.' }, { status: 500 });
  }
}