
import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import {ImgDoc} from '@/app/lib/models';
import {Candidate} from '@/app/lib/models';

export const POST = async (request) => {
  const formData = await request.formData();
  const candidateId = formData.get('candidateId');
  const comment = formData.get('comment');

  await connectToDB();

  // Массив для хранения идентификаторов сохранённых изображений
  const imgDocIds = [];

  // Обрабатываем загруженные файлы
  for (const file of formData.getAll('documents')) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const imgDoc = new ImgDoc({
      name: file.name,
      image: {
        name: file.name,
        data: buffer,
        contentType: file.type,
      },
    });

    // Сохраняем документ изображения и добавляем его ID в массив
    const savedImgDoc = await imgDoc.save();
    imgDocIds.push(savedImgDoc._id);
  }

  // Обновляем запись кандидата, добавляя ссылки на изображения
  const updatedCandidate = await Candidate.findByIdAndUpdate(
    candidateId,
    { $push: { imgDoc: { $each: imgDocIds } } }, // Добавляем массив ID в поле imgDoc
    { new: true } // Возвращаем обновлённый документ
  );

  if (!updatedCandidate) {
    return NextResponse.json({ success: false, message: 'Candidate not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, candidate: updatedCandidate });
};
