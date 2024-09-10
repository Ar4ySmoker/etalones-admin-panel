// "use client";

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { signOut, useSession } from 'next-auth/react';
// import Modal from '@/app/ui/modals/globalModal/GlobalCandidateModal'; // Убедитесь, что путь к компоненту правильный
// import TaskModalContent from '@/app/ui/modals/globalModal/TaskModalContent'; // Убедитесь, что путь к компоненту правильный

// interface Task {
//   _id: string;
//   createdAt: string;
//   dateOfCompletion: string;
//   text: string;
//   title: string;
//   candidate?: { name: string };
//   partner?: { companyName: string };
// }

// const fetchTasks = async () => {
//   try {
//     const response = await fetch('/api/task');
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data: Task[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error;
//   }
// };

// const Calendar: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const tasks = await fetchTasks();
//         setTasks(tasks);

//         // Если выбрана дата, фильтруем задачи
//         if (selectedDate) {
//           const filtered = tasks.filter((task) => {
//             const taskDate = new Date(task.dateOfCompletion);
//             if (isNaN(taskDate.getTime())) {
//               console.error('Invalid date:', task.dateOfCompletion);
//               return false;
//             }
//             const taskDateStr = taskDate.toISOString().split('T')[0];
//             return taskDateStr === selectedDate;
//           });
//           setFilteredTasks(filtered);
//         } else {
//           setFilteredTasks([]);
//         }
//       } catch (error) {
//         console.error('Error loading tasks:', error);
//       }
//     };

//     loadTasks();
//   }, [selectedDate]);

//   const handleDateClick = (date: string) => {
//     setSelectedDate(date);
//   };

//   const handleOpenModal = (taskId: string) => {
//     setSelectedTaskId(taskId);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedTaskId(null);
//   };

//   const generateCalendar = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();

//     // Получаем первый и последний день месяца
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     // Создаем массив дней
//     const days = [];
//     for (let d = 1; d <= lastDay.getDate(); d++) {
//       days.push(new Date(year, month, d));
//     }

//     // Заполняем недели
//     const weeks = [];
//     let week = [];
//     for (let i = 0; i < firstDay.getDay(); i++) {
//       week.push(null); // Пустые дни до начала месяца
//     }

//     days.forEach(day => {
//       if (week.length === 7) {
//         weeks.push(week);
//         week = [];
//       }
//       week.push(day);
//     });

//     if (week.length > 0) {
//       while (week.length < 7) {
//         week.push(null); // Пустые дни после окончания месяца
//       }
//       weeks.push(week);
//     }

//     return weeks;
//   };

//   const calendarWeeks = generateCalendar();

//   return (
//     <>
//       <div className="navbar bg-base-100">
//         <div className="flex-1">
//           <Link href="/dashboard" className="btn btn-ghost text-xl">Etalones S&B</Link>
//           <Link href="/dashboard">Главная</Link>
//         </div>

//         <div className="flex-none">
//           {!session ? (
//             <>
//               <Link href="/login" className="btn btn-primary">Войти</Link>
//               <Link href="/register" className="btn btn-secondary ml-2">Регистрация</Link>
//             </>
//           ) : (
//             <>
//               {session.user?.email}
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                   <div className="w-10 rounded-full">
//                     {/* <Image w alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
//                   </div>
//                 </div>
//                 <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//                   <li>
//                     <a className="justify-between">Профиль<span className="badge">New</span></a>
//                   </li>
//                   <li><a>Настройки</a></li>
//                   <li>
//                     <button onClick={() => signOut()}>Выйти</button>
//                   </li>
//                 </ul>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="grid grid-cols-7 gap-1">
//           <div className="font-bold">Пн</div>
//           <div className="font-bold">Вт</div>
//           <div className="font-bold">Ср</div>
//           <div className="font-bold">Чт</div>
//           <div className="font-bold">Пт</div>
//           <div className="font-bold">Сб</div>
//           <div className="font-bold">Вс</div>

//           {calendarWeeks.map((week, weekIndex) => (
//             <React.Fragment key={weekIndex}>
//               {week.map((day, dayIndex) => (
//                 <div
//                   key={dayIndex}
//                   className={`p-2 cursor-pointer ${day && day.toISOString().split('T')[0] === selectedDate ? 'bg-blue-200' : ''}`}
//                   onClick={() => day && handleDateClick(day.toISOString().split('T')[0])}
//                 >
//                   {day ? day.getDate() : ''}
//                 </div>
//               ))}
//             </React.Fragment>
//           ))}
//         </div>

//         <div className="mt-4">
//           {filteredTasks.length > 0 ? (
//             filteredTasks.map(task => (
//               <div
//                 key={task._id}
//                 className="rounded bg-slate-200 my-4 p-2 cursor-pointer"
//                 onClick={() => handleOpenModal(task._id)}
//               >
//                 <div className="flex flex-col items-start">
//                   <span>Создано: {task.createdAt ? task.createdAt.slice(0, 10) : 'Дата не указана'}</span>
//                   {task.text}
//                   <span>Комментарий: {task.title}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>Нет задач на выбранную дату</div>
//           )}
//         </div>
//       </div>

//       <div>
//         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//           {selectedTaskId && <TaskModalContent taskId={selectedTaskId} />}
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Calendar;
