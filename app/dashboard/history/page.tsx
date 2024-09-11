// 'use client'
// import Link from "next/link";
// import { useState, useEffect } from "react";

// interface Task {
//     _id: string;
//     createdAt: string;
//     dateOfCompletion?: string;
//     text?: string;
//     title?: string;
// }
// const fetchTasks = async (paidFilter) => {
//     try {
//         const response = await fetch(`/api/task?paid=${paidFilter}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         throw error;
//     }
// };

// export default function HistoryPage() {
//     const [tasks, setTasks] = useState([]);
//     const [showCompleted, setShowCompleted] = useState(false);

//     useEffect(() => {
//         // Fetch tasks based on filter
//         const loadTasks = async () => {
//             try {
//                 const fetchedTasks = await fetchTasks(showCompleted);
//                 setTasks(fetchedTasks);
//             } catch (error) {
//                 console.error('Error loading tasks:', error);
//             }
//         };

//         loadTasks();
//     }, [showCompleted]); // Re-fetch tasks when filter changes

//     // Sort tasks by createdAt in descending order
//     const sortedTasks = [...tasks].sort((a: Task, b: Task) => {
//         const dateA = new Date(a.createdAt);
//         const dateB = new Date(b.createdAt);
    
//         if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
//             // Обработка случаев, когда даты невалидны
//             return 0; // Или какое-то другое значение по умолчанию
//         }
    
//         return dateB.getTime() - dateA.getTime(); // Сортировка по убыванию
//     });
    
//     return (
//         <div>
//             <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Задачи</div>
//             <div className="bg-base-300 rounded-md grid w-max place-items-center hover:bg-slate-400 transition duration-200 p-3 cursor-pointer">
//             <Link href="/dashboard/tasks" className="text-center">Посмотреть список кандидатов с задачами</Link>
//                     </div>
//             <ul
//                 tabIndex={0}
//                 className="menu dropdown-content bg-slate-100 bg-opacity-10 rounded-box z-[1] mt-4 w-max p-2 shadow"
//             >
//                 <div className="flex gap-2 mt-2">
//                     <button
//                         className={`btn ${!showCompleted ? 'btn-primary' : 'btn-secondary'}`}
//                         onClick={() => setShowCompleted(false)}
//                     >
//                         Поставленые
//                     </button>
//                     <button
//                         className={`btn ${showCompleted ? 'btn-primary' : 'btn-secondary'}`}
//                         onClick={() => setShowCompleted(true)}
//                     >
//                         Выполненные
//                     </button>
//                 </div>
//                 {sortedTasks.length > 0 ? sortedTasks.map((task) => (
//                     <li key={task._id} className="card bg-slate-200 bg-opacity-50 m-4 place-items-center p-4">
//                         <div className="flex justify-between w-full">
//                             <div>Создано - {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Дата не указана'}</div>
//                             <div>Нужно выполнить до - {task.dateOfCompletion ? new Date(task.dateOfCompletion).toLocaleDateString() : 'Дата не указана'}</div>
//                         </div>
//                         <Link href={`/dashboard/tasks/${task._id}`} className="flex flex-col items-start">
//                             <span>{task.text || 'Untitled Task'}</span>
//                             <span>Комментарий: {task.title}</span>
//                         </Link>
//                     </li>
//                 )) : (
//                     <li className="text-center">Нет задач для отображения</li>
//                 )}
              
//             </ul>
//         </div>
//     );
// }
'use client'
import { useState, useEffect } from 'react';
import Modal from '@/app/ui/modals/globalModal/GlobalCandidateModal'; // Убедитесь, что путь к компоненту правильный
import TaskModalContent from '@/app/ui/modals/globalModal/TaskModalContent'; // Убедитесь, что путь к компоненту правильный

interface Task {
  _id: string;
  createdAt: string;
  dateOfCompletion?: string;
  text?: string;
  title?: string;
}

const fetchTasks = async (paidFilter: boolean) => {
  try {
    const response = await fetch(`/api/task?paid=${paidFilter}`);
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

export default function HistoryPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(showCompleted);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, [showCompleted]);

  const handleOpenModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const sortedTasks = [...tasks].sort((a: Task, b: Task) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Задачи</div>
      <div className="bg-base-300 rounded-md grid w-max place-items-center hover:bg-slate-400 transition duration-200 p-3 cursor-pointer">
        <a href="/dashboard/tasks" className="text-center">Посмотреть список кандидатов с задачами</a>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-slate-100 bg-opacity-10 rounded-box z-[1] mt-4 w-max p-2 shadow"
      >
        <div className="flex gap-2 mt-2">
          <button
            className={`btn ${!showCompleted ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowCompleted(false)}
          >
            Поставленые
          </button>
          <button
            className={`btn ${showCompleted ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowCompleted(true)}
          >
            Выполненные
          </button>
        </div>
        {sortedTasks.length > 0 ? sortedTasks.map((task) => (
          <li
            key={task._id}
            className="card bg-slate-200 bg-opacity-50 m-4 place-items-center p-4 cursor-pointer"
            onClick={() => handleOpenModal(task._id)}
          >
            <div className="flex justify-between w-full">
              <div>Создано - {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Дата не указана'}</div>
              <div>Нужно выполнить до - {task.dateOfCompletion ? new Date(task.dateOfCompletion).toLocaleDateString() : 'Дата не указана'}</div>
            </div>
            <div className="flex flex-col items-start">
              <span>{task.text || 'Задача без заголовка'}</span>
              <span>Комментарий: {task.title}</span>
            </div>
          </li>
        )) : (
          <li className="text-center">Нет задач для отображения</li>
        )}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedTaskId && <TaskModalContent taskId={selectedTaskId} />}
      </Modal>
    </div>
  );
}
