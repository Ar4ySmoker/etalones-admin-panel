// // Пример API для получения изображения по ID
// import { NextResponse } from 'next/server';
// import {ImgDoc} from '@/app/lib/models';

// export const GET = async (request) => {
//   const { imgDocId } = request.query;

//   if (!imgDocId) {
//     return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
//   }

//   try {
//     const imgDoc = await ImgDoc.findById(imgDocId);

//     if (!imgDoc) {
//       return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
//     }

//     return new NextResponse(imgDoc.image.data, {
//       status: 200,
//       headers: {
//         'Content-Type': imgDoc.image.contentType,
//         'Content-Disposition': `attachment; filename=${imgDoc.image.name}`,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// };
import { NextResponse } from 'next/server';
import { ImgDoc } from '@/app/lib/models';

export const GET = async (request) => {
  const url = new URL(request.url);
  const imgDocId = url.pathname.split('/').pop(); // Получаем ID из URL

  console.log(`Received imgDocId: ${imgDocId}`);

  if (!imgDocId) {
    return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
  }

  try {
    const imgDoc = await ImgDoc.findById(imgDocId);

    if (!imgDoc) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    if (!imgDoc.image || !imgDoc.image.data) {
      console.error(`Image data not found for ID: ${imgDocId}`);
      return NextResponse.json({ success: false, message: 'Image data is missing' }, { status: 500 });
    }

    // Проверка типа данных и декодирование изображения
    let imageData;
    if (typeof imgDoc.image.data === 'string') {
      try {
        // Проверка и декодирование строки Base64
        if (imgDoc.image.data.startsWith('data:')) {
          const base64Data = imgDoc.image.data.split(',')[1]; // Удаляем префикс data URL
          imageData = Buffer.from(base64Data, 'base64');
        } else {
          imageData = Buffer.from(imgDoc.image.data, 'base64');
        }
      } catch (error) {
        console.error(`Error converting Base64 to Buffer: ${error.message}`);
        return NextResponse.json({ success: false, message: 'Invalid image data' }, { status: 500 });
      }
    } else if (Buffer.isBuffer(imgDoc.image.data)) {
      imageData = imgDoc.image.data;
    } else {
      console.error(`Unsupported image data format for ID: ${imgDocId}`);
      return NextResponse.json({ success: false, message: 'Unsupported image data format' }, { status: 500 });
    }

    // Убедитесь, что Content-Type устанавливается правильно
    const contentType = imgDoc.image.contentType || 'application/octet-stream';
    
    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${imgDoc.image.name || 'image'}"`, // Используйте 'inline' для отображения в браузере
      },
    });
  } catch (error) {
    console.error(`Error fetching image with ID ${imgDocId}:`, error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
