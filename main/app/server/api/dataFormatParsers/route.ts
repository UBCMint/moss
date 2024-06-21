import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Location of the parsers and the metadata file
const scriptsDir = path.join(process.cwd(), 'dataFormatParsers/parsers');
const scriptsMeta = path.join(process.cwd(), 'dataFormatParsers/parsers/meta.json');

export async function GET(request: Request): Promise<Response> {
  try {
    // Read the metadata file and the data types
    const metadata = await JSON.parse(fs.readFileSync(scriptsMeta, 'utf8'));
    const fileTypes = Object.keys(metadata.basetypes) as string[];
    const customTypes = Object.keys(metadata.customtypes) as string[];

    return NextResponse.json({ fileTypes, customTypes }, { status: 200 });
  } catch (error) {
    console.error('Error reading scripts:', error);
    return NextResponse.json({ error: 'Failed to read scripts' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Read the metadata file and the data types
    const metadata = await JSON.parse(fs.readFileSync(scriptsMeta, 'utf8'));
    const fileTypes = Object.keys(metadata.basetypes) as string[];
    const customTypes = Object.keys(metadata.customtypes) as string[];

    return NextResponse.json({ fileTypes, customTypes }, { status: 200 });
  } catch (error) {
    console.error('Error reading scripts:', error);
    return NextResponse.json({ error: 'Failed to read scripts' }, { status: 500 });
  }
}
