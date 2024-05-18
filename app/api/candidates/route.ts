import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import {Candidate} from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose

export const GET  = async()=>{
  try{
    await connectToDB();
    const candidates = await Candidate.find().limit(10);
    console.log(candidates)
    return new NextResponse(JSON.stringify(candidates), {status:200})
  }
  catch(error){
return new NextResponse("eroor in fetching" + error,{status: 500})
  }
}