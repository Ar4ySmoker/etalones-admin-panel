// 'use client'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import  Navbar from '@/app/ui/Navbar/Navbar'
import React from 'react';
// import GlobalModal from './ui/modals/globalModal/GlobalCandidateModal';
import NotificationManager from './ui/notification/NotificationManager';
import { CandidateProvider } from './context/CandidateContext';
import { Provider } from "./Provider";



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Etalones S&B Админка',
  description: 'Next.js 14 Etalones',
}

export default async function RootLayout({
   children,
   }: { children: React.ReactNode}){
  // const session = await getServerSession();

  return (
    <html lang="ru">
    
    <body className={inter.className}>
      <Provider>
          <CandidateProvider>
          <NotificationManager>
          <div className="container mx-auto px-4">
            <Navbar />
            {children}
            {/* <GlobalModal /> */}

          </div>
          </NotificationManager>
          </CandidateProvider>
        </Provider>
      </body>
 
    </html>
  )
}
