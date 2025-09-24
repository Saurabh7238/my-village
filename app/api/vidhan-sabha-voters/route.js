import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'vidhanSabhaVoters.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const voters = JSON.parse(data);
    return NextResponse.json(voters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Vidhan Sabha voter data' }, { status: 500 });
  }
}