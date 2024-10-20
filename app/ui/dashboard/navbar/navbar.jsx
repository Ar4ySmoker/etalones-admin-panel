"use client";
// import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
} from "react-icons/md";

const Navbar = () => {
  // const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
