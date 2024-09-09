import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { ImgDoc } from '@/app/lib/models';

export const GET = async (request) => {
  try {
    await connectToDB();
    const url = new URL(request.url);
    const imgDocId = url.pathname.split('/').pop();

    if (!imgDocId) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    const imgDoc = await ImgDoc.findById(imgDocId);

    if (!imgDoc) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    if (!imgDoc.image || !imgDoc.image.data) {
      return NextResponse.json({ success: false, message: 'Image data is missing' }, { status: 500 });
    }

    return new NextResponse(imgDoc.image.data, {
      status: 200,
      headers: {
        'Content-Type': imgDoc.image.contentType,
        'Content-Disposition': `inline; filename=${imgDoc.image.name}`, // Используем 'inline' для отображения в браузере
      },
    });

  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
  }
};
