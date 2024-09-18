
// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google],
// })

// // import { handlers } from "@/auth"
// export const { GET, POST } = handlers
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Добавьте уникальный идентификатор сессии в объект сессии
      session.id = token.sub; // или используйте другой уникальный идентификатор
      return session;
    },
  },
};

export default NextAuth(authOptions);
