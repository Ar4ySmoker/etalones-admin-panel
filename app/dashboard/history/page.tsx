'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

const fetchTasks = async (paidFilter) => {
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
    const [tasks, setTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        // Fetch tasks based on filter
        const loadTasks = async () => {
            try {
                const tasks = await fetchTasks(showCompleted);
                setTasks(tasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };

        loadTasks();
    }, [showCompleted]); // Re-fetch tasks when filter changes

    return (

        <div>

            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn ">Задачи</div>
            <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4  w-max p-2 shadow"
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
                {tasks.map((task) => (
                    <li key={task._id} className="card bg-base-300 m-4 place-items-center p-4">
                        <div className="flex justify-between w-full">
                            <div> Создано - {task.createdAt ? task.createdAt.slice(0, 10) : 'Дата не указана'}</div>
                            <div> Нужно выполнить до - {task.dateOfCompletion ? task.dateOfCompletion.slice(0, 10) : 'Дата не указана'}</div>
                        </div>                  <Link href={`/dashboard/tasks/${task._id}`} className="flex flex-col items-start">
                        <span>{task.text || 'Untitled Task'}</span>
                        <span>Комментарий: {task.title}</span>
                        </Link>
                    </li>
                ))}
                <li>
                    <div className="bg-base-300 rounded-md grid w-32 place-items-center">
                        <Link href="/dashboard/tasks">Посмотреть все задачи</Link>
                    </div>
                </li>
            </ul>
        </div>


    );
}