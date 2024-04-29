import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Location } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const locations = await Location.find()
return new NextResponse(JSON.stringify(locations), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch locations" + error, {status:500})
    }
}