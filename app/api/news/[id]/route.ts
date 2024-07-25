// import { connectToDB } from '@/app/lib/utils';
// import { News} from '@/app/lib/models';
// import { NextResponse } from "next/server";

// export const PUT = async (request, { params }) => {
//     try {
//         await connectToDB();
//         const id = params.id;

//         const data = await request.formData();
//         const file = data.get('file');
//         const title = data.get('title');
//         const source = data.get('source');
//         const description = data.get('description');
//         const content = data.get('content');
//         const category = data.get('category');

//         let updatedNews;

//         if (file) {
//             const bufferData = await file.arrayBuffer();
//             const buffer = Buffer.from(bufferData);

//             updatedNews = {
//                 title,
//                 source,
//                 description,
//                 content,
//                 category,
//                 image: {
//                     name: file.name,
//                     data: buffer,
//                     contentType: file.type
//                 }
//             };
//         } else {
//             updatedNews = {
//                 title,
//                 source,
//                 description,
//                 content,
//                 category,
//             };
//         }

//         const result = await News.findByIdAndUpdate(id, updatedNews, { new: true });

//         if (!result) {
//             return new NextResponse(JSON.stringify({ success: false, message: "News not found" }), { status: 404 });
//         }

//         return new NextResponse(JSON.stringify({ success: true, message: "News updated" }), { status: 200 });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         return new NextResponse(JSON.stringify({ success: false, message: "Error updating news", error }), { status: 500 });
//     }
// };

// export async function GET(request, { params }) {
//     const { id } = params;
//     await connectToDB();
//     try {
//         const news = await News.findById(id);
//         if (!news) {
//             console.error('News not found');
//             return NextResponse.json({ message: "News not found" }, { status: 404 });
//         }
//         return NextResponse.json({ news }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching news:', error); // Лог ошибки
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }
import { connectToDB } from '@/app/lib/utils';
import { News } from '@/app/lib/models';
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    try {
        await connectToDB();
        const id = params.id;

        const data = await request.formData();
        const file = data.get('file');
        const title = data.get('title');
        const source = data.get('source');
        const description = data.get('description');
        const content = data.get('content');
        const category = data.get('category');

        let updatedNews;

        if (file) {
            const bufferData = await file.arrayBuffer();
            const buffer = Buffer.from(bufferData);

            updatedNews = {
                title,
                source,
                description,
                content: JSON.parse(content), // Парсинг JSON строки
                category,
                image: {
                    name: file.name,
                    data: buffer,
                    contentType: file.type
                }
            };
        } else {
            updatedNews = {
                title,
                source,
                description,
                content: JSON.parse(content), // Парсинг JSON строки
                category,
            };
        }

        const result = await News.findByIdAndUpdate(id, updatedNews, { new: true });

        if (!result) {
            console.error("News not found with id:", id);
            return new NextResponse(JSON.stringify({ success: false, message: "News not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, message: "News updated" }), { status: 200 });

    } catch (error) {
        console.error("Error updating news:", error);
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating news", error: error.message }), { status: 500 });
    }
};

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const news = await News.findById(id);
        if (!news) {
            console.error('News not found with id:', id);
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        return NextResponse.json({ news }, { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
