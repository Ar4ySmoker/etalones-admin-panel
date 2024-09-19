// import { connectToDB } from '@/app/lib/utils';
// import { Partner } from '@/app/lib/models';
// import { NextResponse } from "next/server";
 


// export async function PUT(request, { params }) {
//   const { id } = params;
//   const body = await request.json();
//   await connectToDB();
//   await Partner.findByIdAndUpdate(id, body);
//   return NextResponse.json({ message: "Partner updated" }, { status: 200 });
// }
 
// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectToDB();
//   const partner = await Partner.findOne({ _id: id }).populate(['manager',]);
//   return NextResponse.json({ partner }, { status: 200 });
// }
import { connectToDB } from '@/app/lib/utils';
import { Partner, Manager } from '@/app/lib/models';
import { NextResponse } from 'next/server';

// Интерфейсы для типизации данных
interface PartnerUpdate {
  manager?: string;
  candidates?: string[];
  [key: string]: any;
}

interface PartnerDoc {
  manager?: string;
  _id: string;
  candidates?: string[];
  // Добавьте другие поля, которые могут быть в документе партнёра
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body: PartnerUpdate = await request.json();

  await connectToDB();

  // Получаем старого партнёра
  const oldPartner = await Partner.findById(id).lean() as PartnerDoc;

  // Проверка на существование партнёра
  if (!oldPartner) {
    return NextResponse.json({ message: "Partner not found" }, { status: 404 });
  }

  // Обновляем информацию о партнёре
  const updatedPartner = await Partner.findByIdAndUpdate(id, body, { new: true }).lean() as PartnerDoc;

  // Логика для менеджера
  if (oldPartner.manager && body.manager && oldPartner.manager.toString() !== body.manager.toString()) {
    // Удаляем партнёра из старого менеджера
    await Manager.findByIdAndUpdate(oldPartner.manager, { $pull: { partners: id } });

    // Добавляем партнёра к новому менеджеру
    await Manager.findByIdAndUpdate(body.manager, { $addToSet: { partners: id } });
  } else if (body.manager) {
    // Если менеджер не изменился, но он установлен, добавляем партнёра в массив partners
    await Manager.findByIdAndUpdate(body.manager, { $addToSet: { partners: id } });
  }

  return NextResponse.json({ message: "Partner updated", partner: updatedPartner }, { status: 200 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDB();

  const partner = await Partner.findById(id).populate(['manager', 'candidates']).lean() as PartnerDoc;
  
  return NextResponse.json({ partner }, { status: 200 });
}

