// import { connectToDB } from '@/app/lib/utils';
// import { VacancyOnServer } from '@/app/lib/models';
// import { NextResponse } from "next/server";


import { connectToDB } from '@/app/lib/utils';
import { VacancyOnServer } from '@/app/lib/models';

import { NextResponse } from "next/server";
 
export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    await connectToDB();
    await VacancyOnServer.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Vacancy updated" }, { status: 200 });
}
 
export async function GET(request, { params }) {
    const { id } = params;
    console.log(`Fetching vacancy with ID: ${id}`); // Лог ID
    await connectToDB();
    try {
        const vacancy = await VacancyOnServer.findById(id).populate('manager');
        if (!vacancy) {
            console.error('Vacancy not found');
            return NextResponse.json({ message: "Vacancy not found" }, { status: 404 });
        }
        console.log('Vacancy found:', vacancy); // Лог данных вакансии
        return NextResponse.json({ vacancy }, { status: 200 });
    } catch (error) {
        console.error('Error fetching vacancy:', error); // Лог ошибки
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
