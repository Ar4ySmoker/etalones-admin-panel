import { connectToDB } from '@/app/lib/utils';
import { VacancyOnServer } from '@/app/lib/models';
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        const id = params.id;

        const data = await request.json();
        
        const updatedFields: { [key: string]: any } = {};
        if (data.published !== undefined) updatedFields.published = data.published;
        if (data.urgently !== undefined) updatedFields.urgently = data.urgently;
        if (data.last !== undefined) updatedFields.last = data.last;

        const result = await VacancyOnServer.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

        if (!result) {
            return new NextResponse(JSON.stringify({ success: false, message: "Vacancy not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, message: "Vacancy updated", vacancy: result }), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating vacancy", error }), { status: 500 });
    }
};
