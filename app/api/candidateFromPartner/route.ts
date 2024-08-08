import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Partner } from '@/app/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    // Получаем всех партнёров и заполняем их кандидатов
    const partners = await Partner.find({})
    .populate({
      path: 'candidates',
      populate: [
        {
          path: 'partners', // Populating the 'partner' field
        },
        {
          path: 'manager', // Populating the 'manager' field
        },
       
      ],
    }).lean();
  

    return new NextResponse(JSON.stringify({ partners }), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
