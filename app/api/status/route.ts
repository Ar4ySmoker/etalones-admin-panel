import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Status } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const status = await Status.find()
return new NextResponse(JSON.stringify(status), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch status" + error, {status:500})
    }
}