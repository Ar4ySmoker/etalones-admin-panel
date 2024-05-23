import { connectToDB } from '@/app/lib/utils';
import { Partner } from '@/app/lib/models';

import { NextResponse } from "next/server";
 
export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    await connectToDB();
    await Partner.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Partner updated" }, { status: 200 });
}
 
export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  // Здесь мы добавляем .populate('manager'), чтобы загрузить данные менеджера
  // const {partner} = await Partner.findOne({ _id: id }).populate(['manager', 'locations', 'langue']);
  const partner = await Partner.findOne({ _id: id }).populate(['manager', 'vacancies',]);

 console.log("PARTNER",partner)
  return  NextResponse.json({ partner }, { status: 200 });
}
