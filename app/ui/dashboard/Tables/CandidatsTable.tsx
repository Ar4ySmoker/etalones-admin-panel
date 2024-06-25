'use client';

import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
export default function CandidatsTable({ candidates }) {
  const formatTime = (timeString) => {
    if (!timeString) return '';
  
    // Создаем новый объект Date из строки времени
    const createdAt = new Date(timeString);
  
    // Добавляем 3 часа к времени
    createdAt.setHours(createdAt.getHours());
  
    // Получаем строку времени в формате HH:mm
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Добавлен</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>
                {candidate.name}
                <br/>
                <span className="badge badge-ghost badge-sm">{candidate.source}</span>
              </td>
              <td>{candidate.phone}</td>
              <td>
{candidate.createdAt?.substring(0, 10)}
<br/>
<span className="badge badge-ghost badge-sm">{formatTime(candidate.createdAt)}</span>
        </td>
        <td><div className={styles.buttons}>
                      <Link href={`/dashboard/candidates/edit/${candidate._id}`}>
                        <button className="btn btn-sm btn-outline btn-error w-full">
                          Редактировать
                        </button>
                      </Link>
                      <Link href={`/dashboard/candidates/${candidate._id}`}>
                        <button className="btn btn-sm btn-success w-full">
                          Подробнее
                        </button>
                      </Link>
                      {/* <div className={styles.buttons}>
                        <button
                          className={`${styles.button} ${styles.view}`}
                          onClick={() => handleOpenModal(candidate)}
                        >
                          Подробнее
                        </button>
                      </div> */}
                    </div></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Добавлен</th>
            <th>Детали</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
