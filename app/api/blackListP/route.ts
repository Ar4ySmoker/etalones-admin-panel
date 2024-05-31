import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import {  Partner } from '@/app/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    console.log('Received request with parameters:');
    console.log('Status:', status);

    // Определение типа для объекта запроса
    type QueryType = {
      status?: string;
    };

    const query: QueryType = {};
    if (status) query.status = status;

    const parnters = await Partner.find(query)
   

    console.log('Partners fetched:', parnters);

    const response = { parnters };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
