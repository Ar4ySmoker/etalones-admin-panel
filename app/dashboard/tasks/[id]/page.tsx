'use client'
import { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import Image from 'next/image';

export default function Page() {
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Определите ID задачи из URL
    const url = new URL(window.location.href);
    const taskId = url.pathname.split('/').pop(); // Получаем последний сегмент из пути URL

    if (!taskId) {
      setError('Task ID is missing');
      setLoading(false);
      return;
    }

    // Выполните запрос к серверу
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`/api/task/${taskId}`); // Обновите путь к API в соответствии с вашим серверным кодом
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []); // Пустой массив зависимостей означает, что запрос выполнится только один раз при монтировании компонента

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!candidate) {
    return <div>No candidate found.</div>;
  }

  return (
    <>
      <div className='flex justify-around items-center'>
        <div className="avatar">
          <div className="w-24 rounded">
            <Image src='/defaultAvatar.jpg' alt='defaultAvatar' width={300} height={300} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="font-bold py-10 text-2xl text-center h1 ">Анкета {candidate.name}</div>
        </div>
      </div>
      
      <div>
        <div className='flex flex-col w-full gap-2 mt-5'>
          <div>Имя: {candidate.name}</div>
          <div>Гражданство: {candidate.citizenship}</div>
          <div>Возраст: {candidate.ageNum ? candidate.ageNum : "не указан"}</div>
          <div>
            Номер телефона: {candidate.phone}
            {candidate.additionalPhones && candidate.additionalPhones.length > 0 ? (
              <ul>
                {candidate.additionalPhones.map((phone, index) => (
                  <li key={index}>{phone}</li>
                ))}
              </ul>
            ) : (
              ' дополнительных номеров нет'
            )}
          </div>
          <div>Местоположение: {candidate.locations}</div>
          <div>Знание языка: {candidate.langue?.name} {candidate.langue?.level ? candidate.langue?.level : ''}</div>
          <div>Статус: {candidate.status}</div>
          <div>
            Статус трудоустройства: 
            <div>
              <span className="badge badge-error">{candidate.statusFromPartner?.who}</span>
              <span className="badge badge-error">{candidate.statusFromPartner?.status}</span>
            </div>
          </div>
          <div>Менеджер: {candidate.manager?.name}</div>
          <div>Номер счёта: {candidate.cardNumber ? candidate.cardNumber : "нет номера счёта"}</div>
          
          {/* Отображение комментариев */}
          <div tabIndex={0} className="collapse bg-base-200">
            <h3 className="collapse-title text-xl font-medium flex items-center justify-between">
              Существующие комментарии <span><FaArrowDown /></span>
            </h3>
            <ul className="overflow-y-auto collapse-content">
              {candidate.comment && candidate.comment.length > 0 ? (
                candidate.comment.map((c, index) => (
                  <li key={index}>
                    <span className='badge badge-accent'>{new Date(c.date).toLocaleString().slice(0, 10)}</span> - {c.text}
                  </li>
                ))
              ) : (
                <li>No comments available</li>
              )}
            </ul>
          </div>
          
          {/* Отображение задач */}
          <div tabIndex={0} className="collapse bg-base-200">
            <h3 className="collapse-title text-xl font-medium flex items-center justify-between">
              Задачи: <span><FaArrowDown /></span>
            </h3>
            <ul className="overflow-y-auto collapse-content">
              {candidate.tasks && candidate.tasks.length > 0 ? (
                candidate.tasks.map((task, index) => (
                  <li key={index}>
                    <span className='badge badge-accent'>
                      {new Date(task.dateOfCompletion).toLocaleString().slice(0, 10)}
                    </span> - {task.text}
                  </li>
                ))
              ) : (
                <li>No tasks available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
