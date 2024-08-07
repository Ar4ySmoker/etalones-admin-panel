import { connectToDB } from '@/app/lib/utils';
import { Candidate } from '@/app/lib/models';

import { NextResponse } from "next/server";
 
export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    await connectToDB();
    await Candidate.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  // Здесь мы добавляем .populate('manager'), чтобы загрузить данные менеджера
  const candidate = await Candidate.findOne({ _id: id }).populate(['comment', 'manager', 'professions', 'langue', 'partners']);
  return  NextResponse.json({ candidate }, { status: 200 });
}
