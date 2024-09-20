import { connectToDB } from "@/app/lib/utils";
import {User} from "@/app/lib/models";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions  = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!userFound) throw new Error("Invalid Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid Password");
        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          phone: u.phone,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
          phone: token.phone,
        }
      };
    },
  },
};

// import { connectToDB } from "@/app/lib/utils";
// import { Manager } from "@/app/lib/models"; // Убедитесь, что у вас есть модель Manager
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDB();

//         // Проверяем, есть ли менеджер с данным email
//         const managerFound = await Manager.findOne({
//           email: credentials?.email,
//         });

//         if (!managerFound) {
//           throw new Error("Access denied: Email not found for any manager.");
//         }

//         // Логируем данные менеджера
//         console.log("Manager found:", managerFound);
//         console.log("Manager phone:", managerFound.phone); // Логируем номер телефона

//         return managerFound; // Возвращаем данные менеджера
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const manager = user as any; // Приведение типа, если нужно
        
//         return {
//           ...token,
//           _id: manager._id, // ID менеджера
//           name: manager.name, // Имя менеджера
//           phone: manager.phone, // Телефон менеджера
//           email: manager.email, // Email менеджера
//           image: manager.image, // Изображение, если нужно
//           telegram: manager.telegram, // Telegram
//           viber: manager.viber, // Viber
//           whatsapp: manager.whatsapp, // WhatsApp
//           candidates: manager.candidates, // Кандидаты
//           partners: manager.partners, // Партнеры
//           // Добавьте другие поля, если необходимо
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         manager: {
//           _id: token._id, // ID менеджера
//           name: token.name, // Имя менеджера
//           phone: token.phone, // Телефон менеджера
//           email: token.email, // Email менеджера
//           image: token.image, // Изображение
//           telegram: token.telegram, // Telegram
//           viber: token.viber, // Viber
//           whatsapp: token.whatsapp, // WhatsApp
//           candidates: token.candidates, // Кандидаты
//           partners: token.partners, // Партнеры
//           // Добавьте другие поля, если необходимо
//         },
//       };
//     },
//   },
// };
