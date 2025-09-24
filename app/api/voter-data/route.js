import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to get the correct file path and directory
const getFilePath = (type) => {
    const dataDir = path.join(process.cwd(), 'data');
    let fileName;
    switch (type) {
        case 'vidhan-sabha':
            fileName = 'vidhanSabhaVoters.json';
            break;
        case 'lok-sabha':
            fileName = 'lokSabhaVoters.json';
            break;
        case 'gram-panchayat':
            fileName = 'gramPanchayatVoters.json';
            break;
        default:
            throw new Error('Invalid voter type');
    }
    return {
        filePath: path.join(dataDir, fileName),
        dataDir
    };
};

// GET request handler
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type) {
        return NextResponse.json({ error: 'Missing voter type parameter' }, { status: 400 });
    }

    try {
        const { filePath } = getFilePath(type);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return NextResponse.json({ voters: [] });
        }
        console.error("Failed to read voter data:", error);
        return NextResponse.json({ error: 'Failed to read voter data' }, { status: 500 });
    }
}

// POST request handler
export async function POST(req) {
    try {
        const { type, ...newVoter } = await req.json();
        const { filePath, dataDir } = getFilePath(type);

        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        let data = { voters: [] };
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            data = JSON.parse(fileContent);
        } catch (readError) {
            console.error(`File not found or invalid, creating new one for type: ${type}`);
            data = { voters: [] };
        }

        const newId = (data.voters.length > 0 ? Math.max(...data.voters.map(v => v.id)) : 0) + 1;
        const voterWithId = { id: newId, ...newVoter };
        
        data.voters.push(voterWithId);
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        return NextResponse.json(voterWithId);
    } catch (error) {
        console.error("Failed to add voter:", error);
        return NextResponse.json({ error: 'Failed to add voter', details: error.message }, { status: 500 });
    }
}

// DELETE request handler
export async function DELETE(req) {
    try {
        const { id, type } = await req.json();
        const { filePath } = getFilePath(type);

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        data.voters = data.voters.filter(voter => voter.id !== id);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ message: 'Voter deleted successfully' });
    } catch (error) {
        console.error("Failed to delete voter:", error);
        return NextResponse.json({ error: 'Failed to delete voter' }, { status: 500 });
    }
}