import { connectToDB } from "@/app/lib/utils";
import { Candidate } from '@/app/lib/models';
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const candidates = await Candidate.find().populate(['manager', 'professions', 'langue']);
  console.log('КАНДИДАТЫ ИЗ API', candidates);
  return NextResponse.json({ candidates }, { status: 200 });
}
