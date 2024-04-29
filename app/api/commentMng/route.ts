import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { CommentMng } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const commentMng = await CommentMng.find({}, 'commentText createdAt');  // Убедитесь, что выбираете поля createdAt
return new NextResponse(JSON.stringify(commentMng ), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch commentMng" + error, {status:500})
    }
}