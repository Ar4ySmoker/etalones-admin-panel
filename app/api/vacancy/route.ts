import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Vacancy } from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose


export const GET  = async()=>{
  try{
    await connectToDB();
    const vacancy = await Vacancy.find();
    console.log("the Vacancy",Vacancy)
    return new NextResponse(JSON.stringify(vacancy), {status:200})
  }
  catch(error){
return new NextResponse("eroor in fetching" + error,{status: 500})
  }
}
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();

    const newVacancy = new Vacancy(body);
    await newVacancy.save();

    return new NextResponse(
      JSON.stringify({ message: "Vacancy is created", vacancy: newVacancy }),
      { status: 201 }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating Vacancy",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};
