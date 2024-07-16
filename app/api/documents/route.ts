import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Document } from '@/app/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        const documents = await Document.find();
        return new NextResponse(JSON.stringify(documents), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectToDB();

        const data = await request.formData();
        const file = data.get('file');
       
        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const newDocument = new Document({
          file: {
            name: file.name,
            data: buffer,
            contentType: file.type
          }
        });

        await newDocument.save();

        return new NextResponse(JSON.stringify({ success: true, message: "Document created successfully", document: newDocument }), { status: 201 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: "Error creating document", error }), { status: 500 });
    }
};