import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";

const menuItems = [
  {
    title: "Страницы",
    list: [
      {
        title: "Главная",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Кандидаты",
        path: "/dashboard/candidates",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Заказчики",
        path: "/dashboard/partners",
        icon: <MdAttachMoney />,
      },
      {
        title: "Вакансии",
        path: "/dashboard/posts",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {
  // const { user } = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {/* <Image
          className={styles.userImage}
          src={user.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        /> */}
        <div className={styles.userDetail}>
          {/* <span className={styles.username}>{user.username}</span> */}
          <span className={styles.userTitle}>Администратор</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default Sidebar;
