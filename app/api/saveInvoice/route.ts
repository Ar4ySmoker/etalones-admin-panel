import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Invoices } from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();

    console.log('Received body:', body); // Логирование полученных данных

    // Здесь проверьте, корректно ли собраны данные из модального окна и переданы ли они правильно

    const newInvoice = new Invoices(body);
    await newInvoice.save();

    console.log('New invoice created:', newInvoice); // Логирование созданного счета

    return new NextResponse(
      JSON.stringify({ message: "Invoice is created", invoice: newInvoice }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating invoice:', error); // Логирование ошибки, если что-то пошло не так
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating invoice",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};
