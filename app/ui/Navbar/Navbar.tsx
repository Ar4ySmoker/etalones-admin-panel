"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// Функция для получения задач с сервера
const fetchTasks = async () => {
  try {
    const response = await fetch('/api/task');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Функция для получения недельных дат
const getWeekDates = () => {
  const now = new Date();
  const startOfWeek = now.getDate() - now.getDay() + 1; // Понедельник
  const dates = [];
  
  for (let i = 0; i < 5; i++) {
    const day = new Date(now.setDate(startOfWeek + i));
    dates.push({
      date: day,
      formattedDate: day.toISOString().split('T')[0], // Форматируем дату в ISO
      dayName: day.toLocaleDateString('ru-RU', { weekday: 'long' })
    });
  }
  return dates;
};

const Navbar = () => {
  const { data: session }: any = useSession();
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);

        // Если выбрана дата, фильтруем задачи
        if (selectedDate) {
          const filtered = tasks.filter((task: { dateOfCompletion: string | number | Date; }) => {
            const taskDate = new Date(task.dateOfCompletion);
            if (isNaN(taskDate.getTime())) {
              console.error('Invalid date:', task.dateOfCompletion);
              return false;
            }
            const taskDateStr = taskDate.toISOString().split('T')[0];
            return taskDateStr === selectedDate;
          });
          setFilteredTasks(filtered);
        } else {
          setFilteredTasks([]);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, [selectedDate]);

  // Обрабатываем выбор даты
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const weekDates = getWeekDates();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl">Etalones S&B</Link>
        <Link href="/dashboard">Главная</Link>
        <div className="px-4">
          <details className="dropdown">
            <summary className="btn m-1">Задачи</summary>
            <div className="dropdown-content bg-base-100 rounded-box z-[1] w-max p-2 shadow">
              <div className="flex justify-between gap-2 w-max">
                {weekDates.map((day) => (
                  <div key={day.formattedDate} className={`flex flex-col items-center cursor-pointer ${day.formattedDate === selectedDate ? 'rounded bg-blue-200' : ''}`}>
                    <div onClick={() => handleDateClick(day.formattedDate)} className="text-sm font-medium flex flex-col items-center">
                      <span className="px-3">{day.dayName}</span>
                      <span className="text-xs w-max">{day.formattedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
              {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <div key={task._id} className="rounded bg-slate-200 my-4">
                      <div
                        className="flex flex-col items-start cursor-pointer"
                      >
                        <span>Создано: {task.createdAt ? task.createdAt.slice(0, 10) : 'Дата не указана'}</span>
                        {`Кандидат ${task.candidate.name} -отправлен на собеседование к ${task.partner.companyName}`}
                        <span>Комментарий: {task.title}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Нет задач на выбранную дату</div>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="flex-none">
        {!session ? (
          <>
            <Link href="/login" className="btn btn-primary">Войти</Link>
            <Link href="/register" className="btn btn-secondary ml-2">Регистрация</Link>
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
                  <a className="justify-between">Профиль<span className="badge">New</span></a>
                </li>
                <li><a>Настройки</a></li>
                <li>
                  <button onClick={() => signOut()}>Выйти</button>
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
