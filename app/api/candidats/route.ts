import { connectToDB } from "@/app/lib/utils";
import { Candidate } from '@/app/lib/models';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const candidates = await Candidate.find();
    console.log('КАНДИДАТЫ ИЗ API', candidates);
    return NextResponse.json({ candidates }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return NextResponse.error();
  }
}
