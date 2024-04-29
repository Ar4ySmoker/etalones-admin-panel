import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Candidate } from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose

export const GET = async (req) => {
  await connectToDB();
  const query = req.nextUrl.searchParams.get("query"); // Получение параметра запроса

  try {
    // Создание регулярного выражения для нечувствительного к регистру поиска
    const regex = new RegExp(query, 'i'); 
    const candidates = await Candidate.find({
      $or: [
        { name: { $regex: regex } },
        { phone: { $regex: regex } }
      ]
    });

    return new NextResponse(JSON.stringify(candidates), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
}
