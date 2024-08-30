// import { connectToDB } from '@/app/lib/utils';
// import { Candidate } from '@/app/lib/models';

// import { NextResponse } from "next/server";
 
// export async function PUT(request, { params }) {
//     const { id } = params;
//     const body = await request.json();
//     await connectToDB();
//     await Candidate.findByIdAndUpdate(id, body);
//     return NextResponse.json({ message: "Candidate updated" }, { status: 200 });
// }
 
// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectToDB();
//   // Здесь мы добавляем .populate('manager'), чтобы загрузить данные менеджера
//   const candidate = await Candidate.findOne({ _id: id }).populate(['comment', 'manager', 'professions', 'langue', 'partners']);
//   return  NextResponse.json({ candidate }, { status: 200 });
// }
import { connectToDB } from '@/app/lib/utils';
import { Candidate, Partner } from '@/app/lib/models';
import { NextResponse } from 'next/server';

// Интерфейсы для типизации данных
interface CandidateUpdate {
  partners?: string;
  [key: string]: any;
}

interface CandidateDoc {
  _id: string;
  partners?: string;
  // Добавьте другие поля, которые могут быть в документе кандидата
}

// PUT-запрос для обновления кандидата
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body: CandidateUpdate = await request.json();

  await connectToDB();

  // Получаем старого кандидата
  const oldCandidate = await Candidate.findById(id).lean() as CandidateDoc;

  // Обновляем информацию о кандидате
  await Candidate.findByIdAndUpdate(id, body);

  // Если партнёр изменился, обновляем массив candidates у старого и нового партнёров
  if (oldCandidate && body.partners && oldCandidate.partners !== body.partners) {
    // Удаляем кандидата из старого партнёра
    if (oldCandidate.partners) {
      await Partner.findByIdAndUpdate(oldCandidate.partners, { $pull: { candidates: id } });
    }

    // Добавляем кандидата в новый партнёр
    await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
  } else if (body.partners) {
    // Если партнёр не изменился, но он установлен, добавляем кандидата в массив candidates
    await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
  }

  return NextResponse.json({ message: "Candidate updated" }, { status: 200 });
}

// GET-запрос для получения кандидата
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDB();

  // Находим кандидата и связанные с ним данные
  const candidate = await Candidate.findById(id)
    .populate(['comment', 'manager', 'professions', 'langue', 'partners'])
    .lean(); // Используем .lean() для возвращения чистого объекта

  return NextResponse.json({ candidate }, { status: 200 });
}
