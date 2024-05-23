import React from 'react';

export default function CandidateDetails({ candidate }) {
  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <div key={index} className='flex '>
        <p>{prof.name}:</p> <span className="badge badge-success">опыт {prof.experience}</span>
      </div>
    ));
  };

  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <div key={index} className='flex '>
        <p>{doc.docType}: <span className="badge badge-neutral">{doc.dateExp ? doc.dateExp: "дата не указана"}</span></p>
        
      </div>
    ));
  };

  console.log('Candidate Data:', candidate); // Добавим отладочное сообщение

  return (
    <>
      <div className="flex">
        <h1 className="font-bold py-10 text-2xl text-center">Анкета {candidate.name}  </h1>
        <h2 className='flex gap-3'>Профессии: {renderProfessions(candidate.professions)}</h2>
      </div>
      <div>
        <div>
          <div className='flex flex-col w-full gap-2'>
            <div>Имя: {candidate.name}</div>
            <div>Возраст: {candidate.age}</div>
            <div>Номер телефона: {candidate.phone}</div>
            <div>Местоположение: {candidate.locations}</div>
            <div>Знание языка: {candidate.langue?.name}</div>
            <div>Статус: {candidate.status}</div>
            <div>
              Статус трудоустройства: <div><span className="badge badge-error">{candidate.statusFromPartner?.who}</span> <span className="badge badge-error">{candidate.statusFromPartner?.status}</span></div> 
            </div>
            <div>Менеджер: {candidate.manager?.name}</div>
            <div>Номер счёта: {candidate.cardNumber ? candidate.cardNumber : "нет номера счёта"}</div>
            <div>Документы: {renderDocuments(candidate.documents)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
