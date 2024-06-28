import { connectToDB } from '@/app/lib/utils';
import { Manager } from '@/app/lib/models';
import { NextResponse } from "next/server";
export const PUT = async (request, { params }) => {
    try {
        await connectToDB();
        const id = params.id;

        const data = await request.data();
        const file = data.get('file');
        const name = data.get('name');
        const phone = data.get('phone');
        const telegram = data.get('telegram');
        const whatsapp = data.get('whatsapp');
        const viber = data.get('viber');

        if (!file || !name || !phone || !location || !telegram || !whatsapp || !viber) {
            return new NextResponse(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const updatedManager = {
            name,
         phone,
         telegram,
         whatsapp,
         viber,
            image: {
                name: file.name,
                data: buffer,
                contentType: file.type
            }
        };

        const result = await Manager.findByIdAndUpdate(id, updatedManager, { new: true });

        if (!result) {
            return new NextResponse(JSON.stringify({ success: false, message: "Manager not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, message: "Manager updated" }), { status: 200 });

    } catch (error) {
        console.error("Error updating manager:", error);
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating manager", error }), { status: 500 });
    }
};

 
export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const manager = await Manager.findById(id);
        if (!manager) {
            console.error('manager not found');
            return NextResponse.json({ message: "manager not found" }, { status: 404 });
        }
        return NextResponse.json({ manager }, { status: 200 });
    } catch (error) {
        console.error('Error fetching manager:', error); // Лог ошибки
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
