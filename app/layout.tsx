import { Inter } from 'next/font/google'
import './ui/globals.css'
import  Navbar from './ui/Navbar/Navbar'
import { getServerSession } from "next-auth";
import SessionProvider from "./utils/SessionProvider";
import React from 'react';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Etalones S&B Админка',
  description: 'Next.js 14 Etalones',
}

export default async function RootLayout({
   children,
   }: { children: React.ReactNode}){
  const session = await getServerSession();

  return (
    <html lang="ru">
    
    <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="container mx-auto px-4">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
 
    </html>
  )
}
