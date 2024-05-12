import { connectToDB } from '@/app/lib/utils';
import { Candidate } from '@/app/lib/models';

import { NextResponse } from "next/server";
 
export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newAge: age, newPhone: phone, newProfessions: profession,  newLocations: location, newLangue: langue, newStatus: status, newManager: manager,newExperience: experience} = await request.json();
    await connectToDB();
    await Candidate.findByIdAndUpdate(id, { name, age, phone, profession, location, langue, status, manager, experience});
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  // Здесь мы добавляем .populate('manager'), чтобы загрузить данные менеджера
  const candidate = await Candidate.findOne({ _id: id }).populate(['manager', 'status', 'langue', 'locations', 'profession','experience']);
  return NextResponse.json({ candidate }, { status: 200 });
}