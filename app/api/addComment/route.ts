import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate, CommentMng } from '@/app/lib/models';

// Предполагается, что WebSocket сервер уже запущен на другом порту


export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();
    const newComment = new CommentMng({ commentText: body.commentText });
    await newComment.save();

    await Candidate.findByIdAndUpdate(body.candidateId, {
      $push: { commentMng: newComment._id }
    });

  

    return new NextResponse(
      JSON.stringify({ message: "Comment added successfully", comment: newComment }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating comment",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
