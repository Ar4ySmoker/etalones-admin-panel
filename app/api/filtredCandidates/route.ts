import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate } from '@/app/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const managerName = searchParams.get('managerName');
    const source = searchParams.get('source');

    console.log('Received request with parameters:');
    console.log('Status:', status);
    console.log('ManagerName:', managerName);
    console.log('Source:', source);

    // Определение типа для объекта запроса
    type QueryType = {
      status?: string;
      manager?: string;
      source?: string;
    };

    const query: QueryType = {};
    if (status) query.status = status;
    if (managerName) query.manager = managerName;
    if (source) query.source = source;

    const candidates = await Candidate.find(query)
      .populate('manager')
      .populate('partners');

    console.log('Candidates fetched:', candidates);

    const response = { candidates };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
