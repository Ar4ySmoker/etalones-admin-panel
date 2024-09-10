import {NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { VacancyOnServer } from '@/app/lib/models';


interface IVacancy {
    _id: string;
    title: string;
    description: string;
    published: boolean;
    createdAt: Date;
    manager: {
        name: string;
        email: string;
    };
}


export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB();
        console.log('mongo is connected');

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '5', 10);

        const totalVacancies = await VacancyOnServer.countDocuments();
        // const totalVacancies = await VacancyOnServer.countDocuments({ published: true });
        console.log('Total Vacancies:', totalVacancies); // Логируем общее количество вакансий
        const vacancies = await VacancyOnServer.find()
            .populate('manager')
            .skip((page - 1) * limit)
            .limit(limit);

        // console.log('Vacancies:', vacancies);

        const totalPages = Math.ceil(totalVacancies / limit);
        console.log('Total Pages:', totalPages);

        return new NextResponse(JSON.stringify({ vacancies, totalPages }), { status: 200 });
    } catch (error) {
        return new NextResponse(`error in fetching: ${error}`, { status: 500 });
    }
};

// export const GET = async (req: NextRequest): Promise<NextResponse> => {
//     try {
//         await connectToDB();
//         console.log('mongo is connected');

//         const url = new URL(req.url);
//         const page = parseInt(url.searchParams.get('page') || '1', 10);
//         const limit = parseInt(url.searchParams.get('limit') || '5', 10); // Количество вакансий для загрузки за один раз

//         const vacancies: IVacancy[] = await VacancyOnServer.find({ published: true })
//             .populate('manager')
//             .skip((page - 1) * limit) // Пропускаем предыдущие вакансии
//             .limit(limit); // Ограничиваем количество загружаемых вакансий

//         const totalVacancies = await VacancyOnServer.countDocuments({ published: true });
//         const totalPages = Math.ceil(totalVacancies / limit);

//         return new NextResponse(JSON.stringify({ vacancies, totalPages }), { status: 200 });
//     } catch (error) {
//         return new NextResponse(`error in fetching: ${error}`, { status: 500 });
//     }
// };
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

