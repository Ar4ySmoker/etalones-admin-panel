// import { NextResponse } from "next/server";
// import { connectToDB } from "@/app/lib/utils";
// import { Candidate, Partner } from "@/app/lib/models";

// export const POST = async (req) => {
//   try {
//     const { candidateId, partnerId, comment } = await req.json();

//     await connectToDB();

//     const candidate = await Candidate.findById(candidateId);

//     if (!candidate) {
//       return new NextResponse(JSON.stringify({ message: 'Candidate not found' }), { status: 404 });
//     }

//     const partner = await Partner.findById(partnerId);

//     if (!partner) {
//       return new NextResponse(JSON.stringify({ message: 'Partner not found' }), { status: 404 });
//     }

//     const taskText = `Кандидат (${candidate.name}) отправлен на собеседование к (${partner.companyName}) комментарий: ${comment}`;

//     candidate.tasks.push({ text: taskText });
//     await candidate.save();

//     return new NextResponse(JSON.stringify({ message: 'Task added to candidate' }), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
//   }
// };

import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Candidate, Partner } from "@/app/lib/models";

export const POST = async (req) => {
  try {
    const { candidateId, partnerId, comment } = await req.json();

    await connectToDB();

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return new NextResponse(JSON.stringify({ message: 'Candidate not found' }), { status: 404 });
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return new NextResponse(JSON.stringify({ message: 'Partner not found' }), { status: 404 });
    }

    const taskText = `Кандидат (${candidate.name}) отправлен на собеседование к (${partner.companyName}) комментарий: ${comment}`;
    candidate.tasks.push({ text: taskText });
    await candidate.save();

    return new NextResponse(JSON.stringify({ message: 'Task added to candidate', candidateId: candidate._id }), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
};
