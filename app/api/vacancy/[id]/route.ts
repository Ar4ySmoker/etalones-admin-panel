import { connectToDB } from '@/app/lib/utils';
import { VacancyOnServer } from '@/app/lib/models';
import { NextResponse } from "next/server";
export const PUT = async (request, { params }) => {
    try {
        await connectToDB();
        const id = params.id;

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

      
        let updatedVacancy;

        if (file) {
            // Если выбран файл, обновляем и изображение
            const bufferData = await file.arrayBuffer();
            const buffer = Buffer.from(bufferData);

       updatedVacancy = {
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
            };
        } else {
            // Если файл не выбран, обновляем без изображения
            updatedVacancy = {
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
                category
            };
        }
        const result = await VacancyOnServer.findByIdAndUpdate(id, updatedVacancy, { new: true });

        if (!result) {
            return new NextResponse(JSON.stringify({ success: false, message: "Vacancy not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, message: "Vacancy updated" }), { status: 200 });

    } catch (error) {
        console.error("Error updating vacancy:", error);
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating vacancy", error }), { status: 500 });
    }
};


 
export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const vacancy = await VacancyOnServer.findById(id).populate('manager');
        if (!vacancy) {
            console.error('Vacancy not found');
            return NextResponse.json({ message: "Vacancy not found" }, { status: 404 });
        }
        return NextResponse.json({ vacancy }, { status: 200 });
    } catch (error) {
        console.error('Error fetching vacancy:', error); // Лог ошибки
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
