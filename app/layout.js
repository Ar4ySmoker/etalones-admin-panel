// import { Inter } from 'next/font/google'
import './ui/globals.css'


// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Etalones S&B Admin Dashboard',
  description: 'Next.js 14 Etalones',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
    
      <body 
      // className={inter.className}
      >{children}</body>
 
    </html>
  )
}
