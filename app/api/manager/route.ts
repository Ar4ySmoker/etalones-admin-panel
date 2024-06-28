import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Manager } from '@/app/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        const managers = await Manager.find();
        return new NextResponse(JSON.stringify(managers), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};


export const POST = async (request) => {
    try {
        await connectToDB();

        const data = await request.formData();
        const file = data.get('file');
        const name = data.get('name');
        const phone = data.get('phone');
        const telegram = data.get('telegram');
        const whatsapp = data.get('whatsapp');
        const viber = data.get('viber');
       

        if (!file || !name || !phone || !location || !telegram || !whatsapp || !viber ) {
            return new NextResponse(JSON.stringify({ success: false, message: "All fields are required" }));
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const newManager = new Manager({
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
        });

        await newManager.save();

        return new NextResponse(JSON.stringify({ success: true, message: "Manager created successfully", manager: newManager }), { status: 201 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: "Error creating manager", error }), { status: 500 });
    }
};

