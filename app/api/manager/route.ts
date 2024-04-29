import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Manager } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const manager = await Manager.find()
console.log("manager is test:", manager)
return new NextResponse(JSON.stringify(manager), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch manager" + error, {status:500})
    }
}