import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Candidate } from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose

export const GET = async (request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;

    const offset = (page - 1) * limit;

    const candidates = await Candidate.find().skip(offset).limit(limit);
    const totalCandidates = await Candidate.countDocuments();
    const totalPages = Math.ceil(totalCandidates / limit);

    const response = {
      candidates,
      page,
      totalPages,
      totalCandidates,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
