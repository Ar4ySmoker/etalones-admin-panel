// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   // Ограничьте доступ к защищенным страницам
//   if (pathname.startsWith('/protected') && !token) {
//     return NextResponse.redirect(new URL('/auth/signin', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/protected/:path*'],
// };




// middleware.ts

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { PUBLIC_ROUTES, PROTECTED_ROUTES, DEFAULT_REDIRECT } from '@/lib/routes';

// export async function middleware(req) {
//     const token = await getToken({ req });

//     // Проверка на публичные маршруты
//     if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
//         return NextResponse.next(); // Доступ разрешен
//     }

//     // Проверка на защищенные маршруты
//     if (PROTECTED_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))) {
//         if (!token) {
//             return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url)); // Перенаправление на главную
//         }

//         const userEmail = token.email;

//         try {
//             const res = await fetch('http://localhost:3000/api/manager');
//             const data = await res.json();

//             if (!res.ok) {
//                 console.error("Error fetching managers:", data);
//                 return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
//             }

//             const managers = data.managers || [];
//             const isManager = managers.some(manager => manager.email === userEmail);

//             if (!isManager) {
//                 return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
//             }
//         } catch (error) {
//             console.error("Error in middleware:", error);
//             return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
//         }
//     }

//     return NextResponse.next(); // Продолжаем выполнение запроса
// }

// export const config = {
//     matcher: [...PROTECTED_ROUTES], // Используем защищенные маршруты для мидлвара
// };


import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, DEFAULT_REDIRECT } from '@/lib/routes';

async function isUserManager(userEmail) {
    
    try {
        // const res = await fetch('http://localhost:3000/api/manager');
        const res = await fetch('https://www.candidat.store/api/manager');

        if (!res.ok) throw new Error("Failed to fetch managers");
        
        const { managers = [] } = await res.json();
        return managers.some(manager => manager.email === userEmail);
    } catch (error) {
        console.error("Error fetching managers:", error);
        return false;
    }
}

export async function middleware(req) {
    const token = await getToken({ req });

    // Публичные маршруты
    if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
        return NextResponse.next();
    }

    // Защищенные маршруты
    if (PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
        }

        const userEmail = token.email;
        if (!(await isUserManager(userEmail))) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [...PROTECTED_ROUTES],
};
