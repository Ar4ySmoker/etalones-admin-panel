//components\Navbar.jsx
"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
 
const Navbar = () => {
    const { data: session }: any = useSession();
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/dashboard" className="btn btn-ghost text-xl">Etalones S&B</Link>
                <Link href="/dashboard">
                    Главная
                </Link>
            </div>
            <div>

            <div className="indicator mx-10">
  <span className="indicator-item badge badge-primary">new</span>
  {/* <div className="bg-base-300 rounded-md grid w-32 place-items-center">
    <Link  href="/dashboard/tasks">
                    Задачи
                </Link>
                </div> */}
                <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Задачи</div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li>
            <div className="bg-base-300 rounded-md grid w-32 place-items-center">
    <Link  href="/dashboard/tasks">
                    Посмотреть все задачи
                </Link>
                </div>
          </li>
        </ul>
      </div>
</div>
                

            </div>
            <div className="flex-none">
                {!session ? (
                    <>
                        <Link href="/login" className="btn btn-primary">
                            Войти
                        </Link>
                        <Link href="/register" className="btn btn-secondary ml-2">
                            Регистрация
                        </Link>
                    </>
                ) : (
                    <>
                        {session.user?.email}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {/* <Image w alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Профиль
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Настройки</a></li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                signOut();
                                            }}
                                        >
                                            Выйти
                                        </button>
                                    </li>
                                </ul>
                            </div>
                    </>
                )}
            </div>
        </div>
    );
};
 
export default Navbar;