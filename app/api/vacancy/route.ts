import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { VacancyOnServer } from '@/app/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        const vacancies = await VacancyOnServer.find().populate('manager');;
        return new NextResponse(JSON.stringify(vacancies), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};


export const POST = async (request) => {
    try {
        await connectToDB();

        const data = await request.formData();
        const file = data.get('file');
        const title = data.get('title');
        const salary = data.get('salary');
        const location = data.get('location');
        const roof_type = data.get('roof_type');
        const auto = data.get('auto');
        const positions_available = data.get('positions_available');
        const homePrice = data.get('homePrice');
        const home_descr = data.get('home_descr');
        const work_descr = data.get('work_descr');
        const grafik = data.get('grafik');
        const documents = data.get('documents');
        const manager = data.get('manager');
        const category = data.get('category');

        if (!file || !title || !salary || !location || !roof_type || !auto || !positions_available ||
            !homePrice || !home_descr || !work_descr || !grafik || !documents || !manager
            || !category) {
            return new NextResponse(JSON.stringify({ success: false, message: "All fields are required" }));
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const newVacancy = new VacancyOnServer({
            title,
            salary,
            location,
            roof_type,
            auto,
            positions_available,
            homePrice,
            home_descr,
            work_descr,
            grafik,
            documents,
            manager,
            category,
            image: {
                name: file.name,
                data: buffer,
                contentType: file.type
            }
        });

        await newVacancy.save();

        return new NextResponse(JSON.stringify({ success: true, message: "Vacancy created successfully", vacancy: newVacancy }), { status: 201 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: "Error creating vacancy", error }), { status: 500 });
    }
};

