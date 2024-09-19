import { connectToDB } from '@/app/lib/utils';
import { Candidate, Partner, Manager } from '@/app/lib/models';
import { NextResponse } from 'next/server';

// Интерфейсы для типизации данных
interface CandidateUpdate {
  partners?: string;
  [key: string]: any;
}

interface CandidateDoc {
  manager: any;
  _id: string;
  partners?: string;
  // Добавьте другие поля, которые могут быть в документе кандидата
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body: CandidateUpdate = await request.json();

  console.log('Updating candidate with ID:', id);
  console.log('Request body:', body);

  await connectToDB();

  // Получаем старого кандидата
  const oldCandidate = await Candidate.findById(id).lean() as CandidateDoc;

  console.log('Old candidate:', oldCandidate);

  // Обновляем информацию о кандидате
  const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, { new: true }).lean();
  
  console.log('Updated candidate:', updatedCandidate);

  // Логика для партнёров
  if (oldCandidate && body.partners && oldCandidate.partners?.toString() !== body.partners.toString()) {
    // Удаляем кандидата из старого партнёра
    if (oldCandidate.partners) {
      await Partner.findByIdAndUpdate(oldCandidate.partners, { $pull: { candidates: id } });
    }

    // Добавляем кандидата в нового партнёра
    await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
  } else if (body.partners) {
    // Если партнёр не изменился, но он установлен, добавляем кандидата в массив candidates
    await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
  }

  // Логика для менеджеров
  if (oldCandidate && body.manager && oldCandidate.manager?.toString() !== body.manager.toString()) {
    // Удаляем кандидата из старого менеджера
    if (oldCandidate.manager) {
      await Manager.findByIdAndUpdate(oldCandidate.manager, { $pull: { candidates: id } });
    }

    // Добавляем кандидата в нового менеджера
    await Manager.findByIdAndUpdate(body.manager, { $addToSet: { candidates: id } });
  } else if (body.manager) {
    // Если менеджер не изменился, но он установлен, добавляем кандидата в массив candidates
    await Manager.findByIdAndUpdate(body.manager, { $addToSet: { candidates: id } });
  }

  return NextResponse.json({ message: "Candidate updated" }, { status: 200 });
}

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const body: CandidateUpdate = await request.json();

//   console.log('Updating candidate with ID:', id);
//   console.log('Request body:', body);

//   await connectToDB();

//   // Получаем старого кандидата
//   const oldCandidate = await Candidate.findById(id).lean() as CandidateDoc;

//   console.log('Old candidate:', oldCandidate);

//   // Обновляем информацию о кандидате
//   const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, { new: true }).lean();
  
//   console.log('Updated candidate:', updatedCandidate);

//   // Если партнёр изменился, обновляем массив candidates у старого и нового партнёров
//   if (oldCandidate && body.partners && oldCandidate.partners !== body.partners) {
//     // Удаляем кандидата из старого партнёра
//     if (oldCandidate.partners) {
//       await Partner.findByIdAndUpdate(oldCandidate.partners, { $pull: { candidates: id } });
//     }

//     // Добавляем кандидата в новый партнёр
//     await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
//   } else if (body.partners) {
//     // Если партнёр не изменился, но он установлен, добавляем кандидата в массив candidates
//     await Partner.findByIdAndUpdate(body.partners, { $addToSet: { candidates: id } });
//   }

//   return NextResponse.json({ message: "Candidate updated" }, { status: 200 });
// }

// GET-запрос для получения кандидата
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDB();

  // Находим кандидата и связанные с ним данные
  const candidate = await Candidate.findById(id)
    .populate(['comment', 'manager', 'professions', 'langue', 'partners', 'tasks'])
    .lean(); // Используем .lean() для возвращения чистого объекта

  return NextResponse.json({ candidate }, { status: 200 });
}
