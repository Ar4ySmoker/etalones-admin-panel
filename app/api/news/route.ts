import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import {News} from '@/app/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        const news = await News.find();
        return new NextResponse(JSON.stringify(news), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectToDB();

        const data = await request.formData();
        const file = data.get('file');
        const source = data.get('source');
        const title = data.get('title');
        const category = data.get('category');
        const description = data.get('description');
        const content = JSON.parse(data.get('content'));

        let image = null;
        if (file) {
            const bufferData = await file.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            image = {
                name: file.name,
                data: buffer,
                contentType: file.type
            };
        }

        const newNews = new News({
            image,
            source,
            title,
            category,
            description,
            content
        });

        await newNews.save();

        return new NextResponse(JSON.stringify({ success: true, message: "News created successfully", news: newNews }), { status: 201 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: "Error creating news", error }), { status: 500 });
    }
};
