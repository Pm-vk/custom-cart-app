// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import imagekit from '@/lib/ImageKitInstance';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const uploadResponse = await imagekit.upload({
      file: Buffer.from(buffer),
      fileName: file.name,
      useUniqueFileName: true
    });

    return NextResponse.json({
      url: uploadResponse.url,
      fileId: uploadResponse.fileId
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}