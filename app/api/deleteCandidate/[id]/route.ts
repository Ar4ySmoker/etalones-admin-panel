// Файл: api/deleteCandidate/route.ts

import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { connectToDB } from '@/app/lib/utils';
import { Candidate, CommentMng } from "@/app/lib/models";

export const DELETE = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const candidateId = searchParams.get("candidateId");
  
      if (!candidateId || !Types.ObjectId.isValid(candidateId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid or missing candidateId" }), {
          status: 400,
        });
      }
  
      await connectToDB();
  
      // Поиск и удаление всех комментариев, связанных с кандидатом
      const candidate = await Candidate.findById(candidateId);
      if (candidate && candidate.commentMng.length) {
        await CommentMng.deleteMany({ _id: { $in: candidate.commentMng } });
      }

      // Удаление самого кандидата
      const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);
      if (!deletedCandidate) {
        return new NextResponse(JSON.stringify({ message: "Candidate not found" }), {
          status: 404,
        });
      }
  
      // Успешный ответ
      return new NextResponse(JSON.stringify({ message: "Candidate and related comments deleted successfully" }), {
        status: 200,
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({
        message: "Error deleting candidate",
        error: error.toString()  // Чтобы клиент видел текст ошибки
      }), {
        status: 500,
      });
    }
};
