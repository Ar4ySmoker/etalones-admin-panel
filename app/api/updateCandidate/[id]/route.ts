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
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/app/lib/utils';
// import { Candidate, Partner } from '@/app/lib/models';

// export const PUT = async (request: Request) => {
//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');
//     if (!id) {
//       console.log('Missing candidate ID');
//       return new NextResponse(JSON.stringify({ message: "Missing candidate ID" }), { status: 400 });
//     }

//     const body = await request.json();
//     console.log('Request body:', body);

//     await connectToDB();

//     const currentCandidate = await Candidate.findById(id);
//     if (!currentCandidate) {
//       console.log('Candidate not found:', id);
//       return new NextResponse(JSON.stringify({ message: "Candidate not found" }), { status: 404 });
//     }

//     const oldPartnerId = currentCandidate.partners?.toString();
//     const newPartnerId = body.partners;

//     const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, { new: true });
//     if (!updatedCandidate) {
//       console.log('Candidate not found after update:', id);
//       return new NextResponse(JSON.stringify({ message: "Candidate not found after update" }), { status: 404 });
//     }

//     if (oldPartnerId && oldPartnerId !== newPartnerId) {
//       console.log('Removing candidate from old partner:', oldPartnerId);
//       await Partner.findByIdAndUpdate(oldPartnerId, { $pull: { candidates: id } });
//     }

//     if (newPartnerId && oldPartnerId !== newPartnerId) {
//       console.log('Adding candidate to new partner:', newPartnerId);
//       await Partner.findByIdAndUpdate(newPartnerId, { $addToSet: { candidates: id } });
//     }

//     console.log('Candidate updated:', updatedCandidate);
//     return new NextResponse(
//       JSON.stringify({ message: "Candidate updated", candidate: updatedCandidate }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log('Error updating candidate:', error);
//     return new NextResponse(
//       JSON.stringify({ message: "Error updating candidate", error: (error as Error).message }),
//       { status: 500 }
//     );
//   }
// };
