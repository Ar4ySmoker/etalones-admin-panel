// // app/api/userData/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { MongoClient, ObjectId } from 'mongodb';

// const client = new MongoClient(process.env.MONGODB_URI as string);

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await client.connect();
//     const db = client.db('test');
//     const users = db.collection('users');

//     // Преобразование token.sub в ObjectId
//     const userId = new ObjectId(token.sub as string);
//     const user = await users.findOne({ _id: userId });

//     if (user) {
//       return NextResponse.json(user);
//     } else {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }
// app/api/userData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '@/app/lib/utils';
import { User } from '@/app/lib/models'; // Импортируйте вашу модель пользователя

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB(); // Используем функцию подключения

    const userId = token.sub as string; // Извлекаем userId из токена
    const user = await User.findById(userId); // Предполагается, что у вас есть метод findById

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in fetching user data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
