// app/api/test/route.ts
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    publicKey: !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: !!process.env.IMAGEKIT_PRIVATE_KEY, // Should be true
    urlEndpoint: !!process.env.IMAGEKIT_URLENDPOINT
  });
}