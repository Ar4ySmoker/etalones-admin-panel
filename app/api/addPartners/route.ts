import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import {Partner} from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose


export const GET  = async()=>{
  try{
    await connectToDB();
    const partners = await Partner.find();
    console.log("the partners",Partner)
    return new NextResponse(JSON.stringify(partners), {status:200})
  }
  catch(error){
return new NextResponse("eroor in fetching" + error,{status: 500})
  }
}
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();

    const newPartner = new Partner(body);
    await newPartner.save();

    return new NextResponse(
      JSON.stringify({ message: "newPartner is created", partner: newPartner }),
      { status: 201 }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating newPartner",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();

//     await connectToDB();
//     const newCandidate = new Candidate(body);
//     await newCandidate.save();
    

//     return new NextResponse(
//       JSON.stringify({ message: "Candidate is created", candidate: newCandidate }),
//       { status: 201 }
//     );
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({
//         message: "Error in creating user",
//         error,
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// };