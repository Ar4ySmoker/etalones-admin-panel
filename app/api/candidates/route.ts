import { NextRequest, NextResponse } from 'next/server';
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


// export  async function handler(req, res) {
//   const { page = 1, limit = 5, searchTerm = '' } = req.query;

//   try {
//     await connectToDB();

//     // Формируем запрос агрегации с использованием $search
//     const pipeline = [
//       {
//         "$search": {
//           "text": {
//             "query": searchTerm,
//             "path": "phone"
//           },
//           "tracking": {
//             "searchTerms": searchTerm
//           }
//         }
//       },
//       {
//         "$skip": (page - 1) * limit
//       },
//       {
//         "$limit": Number(limit)
//       },
    
//     ];

//     const candidates = await Candidate.aggregate(pipeline);

//     const total = await Candidate.countDocuments({ 'phone': { $regex: searchTerm, $options: 'i' } });

//     res.status(200).json({
//       candidates,
//       page: Number(page),
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching candidates', error });
//   }
// }
export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const searchTerm = searchParams.get('searchTerm') || '';

    const pipeline = [
      {
        $search: {
          text: {
            query: searchTerm,
            path: 'phone',
          },
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const candidates = await Candidate.aggregate(pipeline);
    const total = await Candidate.countDocuments({ phone: { $regex: searchTerm, $options: 'i' } });

    const response = {
      candidates,
      page,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse(`Error fetching candidates: ${error}`, { status: 500 });
  }
}