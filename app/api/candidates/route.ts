import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate } from '@/app/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const status = searchParams.get('status');
    const managerName = searchParams.get('managerName'); // Правильно получаем имя менеджера

    console.log('Received request with parameters:');
    console.log('Page:', page);
    console.log('Limit:', limit);
    console.log('Status:', status);
    console.log('Manager Name:', managerName);

    const offset = (page - 1) * limit;

        const filter: { [key: string]: any } = {};
    if (status) {
      filter.status = status;
    }
    if (managerName) {
      filter['manager.name'] = managerName; // Используем имя менеджера в фильтре
    }

    console.log('Filter:', filter); // Добавлено отладочное сообщение

    const candidates = await Candidate.find(filter)
      .skip(offset)
      .limit(limit)
      .populate('manager');

    const totalCandidates = await Candidate.countDocuments(filter);
    const totalPages = Math.ceil(totalCandidates / limit);

    const response = {
      candidates,
      page,
      totalPages,
      totalCandidates,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
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
    console.error('Error fetching candidates:', error);
    return new NextResponse(`Error in fetching: ${error}`, { status: 500 });
  }
};
