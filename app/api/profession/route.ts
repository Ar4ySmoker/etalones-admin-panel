import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Profession } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const profession = await Profession.find()
console.log("Profession is test:", profession)
return new NextResponse(JSON.stringify(profession), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch professions" + error, {status:500})
    }
}