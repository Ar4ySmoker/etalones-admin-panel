import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Partner } from '@/app/lib/models'; // Предполагаемый путь к вашей модели Mongoose

export const GET = async (request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;

    const offset = (page - 1) * limit;

    const partners = await Partner.find().sort({ createdAt: -1 }).skip(offset).limit(limit).populate(['manager', 'candidates']);
    const totalPartners = await Partner.countDocuments();
    const totalPages = Math.ceil(totalPartners / limit);

    const response = {
      partners,
      page,
      totalPages,
      totalPartners,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};


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

    const candidates = await Partner.aggregate(pipeline);
    const total = await Partner.countDocuments({ phone: { $regex: searchTerm, $options: 'i' } });

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