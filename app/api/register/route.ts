import {User} from "@/app/lib/models";
import {connectToDB} from "@/app/lib/utils";
import bcrypt from "bcryptjs"; //https://www.npmjs.com/package/bcryptjs npm install bcryptjs
import { NextResponse } from "next/server";
 
export const POST = async (request: any) => {
    const { name, email, password } = await request.json();
 
    await connectToDB();
 
    const existingUser = await User.findOne({ email });
 
    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
 
    try {
        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};