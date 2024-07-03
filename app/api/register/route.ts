// app/api/register.ts
import { User } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { name, email, password, username } = await request.json();

    try {
        await connectToDB();

        // Проверка наличия пользователя по email или username
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return new NextResponse("Email is already in use", { status: 400 });
            } else {
                return new NextResponse("Username is already taken", { status: 400 });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        return new NextResponse("User is registered", { status: 200 });
    } catch (err: any) {
        console.error("Error in user registration:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
