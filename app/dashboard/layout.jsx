'use client'
// import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer"
// import { CandidateProvider } from "../context/CandidateContext"
import { SessionProvider } from "next-auth/react"
import { ModalProvider } from "../context/ModalContext"
const Layout = ({children}) => {
  
  return (
    <SessionProvider>
      <ModalProvider>
    {/* <CandidateProvider> */}
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        {/* <Navbar/> */}

        {children}
        <Footer/>
      </div>
    </div>
    {/* </CandidateProvider> */}
    </ModalProvider>
    </SessionProvider>
  )
}

export default Layout