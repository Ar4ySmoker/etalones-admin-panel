import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Manager } from '@/app/lib/models';

export const GET = async() =>{
    try{
await connectToDB()
const manager = await Manager.find()
console.log("manager is test:", manager)
return new NextResponse(JSON.stringify(manager), {status:200})

    const managers = await Manager.find({})
      .sort({ createdAt: -1 });

    console.log("Fetched managers:", managers);

    const response = {
      managers,
      totalCount: managers.length,
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
