// Пример API для получения изображения по ID
import { NextResponse } from 'next/server';
import {ImgDoc} from '@/app/lib/models';

export const GET = async (request) => {
  const { imgDocId } = request.query;

  if (!imgDocId) {
    return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
  }

  try {
    const imgDoc = await ImgDoc.findById(imgDocId);

    if (!imgDoc) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(imgDoc.image.data, {
      status: 200,
      headers: {
        'Content-Type': imgDoc.image.contentType,
        'Content-Disposition': `attachment; filename=${imgDoc.image.name}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
