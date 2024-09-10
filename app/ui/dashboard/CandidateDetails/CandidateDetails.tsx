import Image from 'next/image';
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

export default function CandidateDetails({ candidate }) {

  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <div key={index} className='flex items-center gap-2'>
        <p>{prof.name}:</p>
        <span className="badge badge-success">опыт {prof.experience}</span>
      </div>
    ));
  };

  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <div key={index} className='w-max'>
        <p>{doc.docType}: <span className="badge badge-neutral">{doc.dateExp ? doc.dateExp : "дата не указана"}</span> <span className="badge badge-neutral">{doc.numberDoc ? doc.numberDoc : 'Номер не указан'}</span></p>
      </div>
    ));
  };

  // const renderComments = (comments) => {
  //   if (!comments || comments.length === 0) {
  //     return "Пусто...";
  //   }
  //   return (
  //     <ul className="h-[100px] overflow-y-auto">
  //       {comments.map((c, index) => (
  //         <li key={index}>{c.text} - {new Date(c.date).toLocaleString()}</li>
  //       ))}
  //     </ul>
  //   );
  // };

  const renderTasks = (tasks) => {
    if (!tasks || tasks.length === 0) {
      return "нет задач";
    }
    return tasks.map((task, index) => (
      <div key={index} className='flex items-center gap-2'>
        <span className='badge badge-info'>{new Date(task.dateOfCompletion).toLocaleString().slice(0, 10)}</span>
       <div>
        <p>{task.text}</p>

        <p><span className='font-semibold'>Комментарий менеджера: </span>{task.title}</p>
       </div>
      </div>
    ));
  };

  return (
    <>
      <div className='flex justify-around items-center'>
        <div className="avatar">
          <div className="w-24 rounded">
            <Image src='/defaultAvatar.jpg' alt='defaultAvatar' width={300} height={300} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="font-bold py-10 text-2xl text-center h1">Анкета {candidate.name}</div>
          <div className='flex flex-wrap gap-3 '>
            <strong>Профессии:</strong>
            {renderProfessions(candidate.professions)}
          </div>
        </div>
      </div>

      <div>
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
            <div>Документы: {renderDocuments(candidate.documents)}</div>
            {/* <div>Старый Комментарий: {candidate?.comment}</div> */}
            {/* {renderComments(candidate.comment)} */}
            <div tabIndex={0} className="collapse bg-base-200">
              <h3 className="collapse-title text-xl font-medium flex items-center justify-between">
                Существующие комментарии <span><FaArrowDown /></span>
              </h3>
              <ul className=" overflow-y-auto collapse-content">
                {candidate?.comment?.map((c, index) => (
                  <li key={index}><span className='badge badge-accent'>{new Date(c.date).toLocaleString().slice(0, 10)}</span> - {c.text}</li>
                ))}
              </ul>
            </div>
            <div tabIndex={0} className="collapse bg-base-200">
              <h3 className="collapse-title text-xl font-medium flex items-center justify-between">
                Задачи <span><FaArrowDown /></span>
              </h3>
              <ul className=" overflow-y-auto collapse-content">
                {renderTasks(candidate.tasks)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
