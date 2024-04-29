import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import {Candidate} from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose


export const GET  = async()=>{
  try{
    await connectToDB();
    const candidates = await Candidate.find();
    console.log("the candidate",Candidate)
    return new NextResponse(JSON.stringify(candidates), {status:200})
  }
  catch(error){
return new NextResponse("eroor in fetching" + error,{status: 500})
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();
    const newCandidate = new Candidate(body);
    console.log(body)
    await newCandidate.save();
    

    return new NextResponse(
      JSON.stringify({ message: "Candidate is created", candidate: newCandidate }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating user",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};