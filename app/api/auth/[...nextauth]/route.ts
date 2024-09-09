//app\api\auth\[...nextauth]\route.ts
import NextAuth, { AuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {User} from "@/app/lib/models";
import {connectToDB} from "@/app/lib/utils";
 const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connectToDB();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            return user;
                        }
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ 
            // user,
             account }: { user: AuthUser; account: Account }) {
            if (account?.provider == "credentials") {
                return true;
            }
        },
    },
};
 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };