import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

function readDataFile(fileName) {
  try {
    const filePath = path.join(dataDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

function writeDataFile(fileName, data) {
  try {
    const filePath = path.join(dataDirectory, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${fileName}:`, error);
    return false;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'vidhan-sabha';
    let fileName = '';

    switch (type) {
      case 'vidhan-sabha':
        fileName = 'vidhan-sabha.json';
        break;
      case 'lok-sabha':
        fileName = 'lok-sabha.json';
        break;
      case 'gram-panchayat':
        fileName = 'gram-panchayat.json';
        break;
      default:
        return NextResponse.json({ error: 'Invalid voter type' }, { status: 400 });
    }

    const data = readDataFile(fileName);
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, ...newItem } = body;
    let fileName = '';

    switch (type) {
      case 'vidhan-sabha':
        fileName = 'vidhan-sabha.json';
        break;
      case 'lok-sabha':
        fileName = 'lok-sabha.json';
        break;
      case 'gram-panchayat':
        fileName = 'gram-panchayat.json';
        break;
      default:
        return NextResponse.json({ error: 'Invalid voter type' }, { status: 400 });
    }

    const data = readDataFile(fileName);
    const newRecord = { id: Date.now(), ...newItem };
    data.push(newRecord);
    
    if (writeDataFile(fileName, data)) {
      return NextResponse.json(newRecord);
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id, type } = body;
    let fileName = '';

    switch (type) {
      case 'vidhan-sabha':
        fileName = 'vidhan-sabha.json';
        break;
      case 'lok-sabha':
        fileName = 'lok-sabha.json';
        break;
      case 'gram-panchayat':
        fileName = 'gram-panchayat.json';
        break;
      default:
        return NextResponse.json({ error: 'Invalid voter type' }, { status: 400 });
    }

    let data = readDataFile(fileName);
    data = data.filter(item => item.id !== id);

    if (writeDataFile(fileName, data)) {
      return NextResponse.json({ message: 'Item deleted successfully' });
    } else {
      throw new Error('Failed to delete item');
    }

  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}