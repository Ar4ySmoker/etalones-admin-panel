import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Langue } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const langue = await Langue.find()
return new NextResponse(JSON.stringify(langue), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch langue" + error, {status:500})
    }
}