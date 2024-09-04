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
  MdTimer,
} from "react-icons/md";

const menuItems = [
  {
    title: "Страницы",
    list: [
      {
        title: "Главная",
        path: "/dashboard",
        icon: <MdDashboard />,
        disabled: false,
      },
      {
        title: "Кандидаты",
        path: "/dashboard/candidates",
        icon: <MdSupervisedUserCircle />,
        disabled: false,
      },
      {
        title: "Заказчики",
        path: "/dashboard/partners",
        icon: <MdAttachMoney />,
        disabled: false,
      },
    ],
  },
  {
    title: "Данные на сайте",
    list: [
      {
        title: "Вакансии",
        path: "/dashboard/vacancy",
        icon: <MdShoppingBag />,
        disabled: false,
      },
      {
        title: "Новости",
        path: "/dashboard/news",
        icon: <MdShoppingBag />,
        disabled: false,
      },
    ],
  },
  {
    title: "Аналитика",
    list: [
      {
        title: "Люди в работе",
        path: "/dashboard/workPeople",
        icon: <MdWork />,
        disabled: false,
      },
      {
        title: "История",
        path: "/dashboard/history",
        icon: <MdTimer />,
        disabled: false,
      },
      {
        title: "Счёта",
        path: "/dashboard/invoices",
        icon: <MdAnalytics />,
        disabled: false,
      },
      {
        title: "Не обработанные контакты",
        path: "/dashboard/teams",
        icon: <MdPeople />,
        disabled: true,
      },
      {
        title: "Чёрный список",
        path: "/dashboard/blackList",
        icon: <MdPeople />,
        disabled: false,
      },
    ],
  },
  {
    title: "Пользователи",
    list: [
      {
        title: "Настройки",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
        disabled: true,
      },
      {
        title: "Помощь",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
        disabled: true,
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
          <li key={cat.title} >
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
