// Путь к вашему файлу API для обновления данных кандидата, например, updateCandidate.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate } from '@/app/lib/models';

export const PUT = async (request) => {
  try {
    const { id } = request.query; // Предполагается, что вы передаете id кандидата в URL
    const body = await request.json();

    await connectToDB();
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, { new: true });

    if (!updatedCandidate) {
      return new NextResponse(JSON.stringify({ message: "Candidate not found" }), { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Candidate updated", candidate: updatedCandidate }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error updating candidate", error }),
      { status: 500 }
    );
  }
};