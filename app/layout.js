// import { Inter } from 'next/font/google'
import './ui/globals.css'
import { getServerSession } from "next-auth";
// import SessionProvider from "./utils/SessionProvider";

import {Navbar} from './ui/Navbar/Navbar'


// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Etalones S&B Admin Dashboard',
  description: 'Next.js 14 Etalones',
}

export default async function RootLayout({ children }) {
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
