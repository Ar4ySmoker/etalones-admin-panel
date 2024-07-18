import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Путь к функции подключения к базе данных
import { Candidate } from '@/app/lib/models'; // Путь к вашей модели Mongoose
export const POST = async (request) => {
  try {
    const body = await request.json();
    console.log('Received phone:', body.phone); // Добавьте эту строку для отладки

    await connectToDB();

    // Проверяем, существует ли кандидат с таким номером телефона
    const existingCandidate = await Candidate.findOne({ phone: body.phone });
    if (existingCandidate) {
      return new NextResponse(
        JSON.stringify({ message: "Кандидат с таким номером телефона уже существует" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Номер телефона доступен" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error); // Добавьте вывод ошибок для отладки
    return new NextResponse(
      JSON.stringify({
        message: "Ошибка при проверке номера телефона",
        error,
      }),
      { status: 500 }
    );
  }
};
