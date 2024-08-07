import React from 'react';

export default function CandidateDetails({ candidate }) {
  console.log('Candidate data:', candidate);

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
      <div key={index} className='w-max'>
        <p>{doc.docType}: <span className="badge badge-neutral">{doc.dateExp ? doc.dateExp: "дата не указана"}</span> <p className="badge badge-neutral">{doc.numberDoc ? doc.numberDoc: 'Номер не указан'}</p></p>
        
      </div>
    ));
  };
  const renderComments = (comments) => {
    if (!comments || comments.length === 0) {
      return "Пусто...";
    }
    return (
      <ul className="h-[100px] overflow-y-auto">
        {comments.map((c, index) => (
          <li key={index}>{c.text} - {new Date(c.date).toLocaleString()}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="font-bold py-10 text-2xl text-center h1 py-0">Анкета {candidate.name}  </div>
        <div className='flex flex-wrap gap-3 '><strong>Профессии:</strong> {renderProfessions(candidate.professions)}</div>
      </div>
      <div>
        <div>
          <div className='flex flex-col w-full gap-2 mt-5'>
            <div>Имя: {candidate.name}</div>
            <div>Гражданство: {candidate.citizenship}</div>
            <div>Возраст: {candidate.ageNum ? candidate.ageNum: "не указан"}</div>
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
            <div>Знание языка: {candidate.langue?.name} {candidate.langue?.level ? candidate.langue?.level:''}</div>
            <div>Статус: {candidate.status}</div>
            <div>
              Статус трудоустройства: <div><span className="badge badge-error">{candidate.statusFromPartner?.who}</span> <span className="badge badge-error">{candidate.statusFromPartner?.status}</span></div> 
            </div>
            <div>Менеджер: {candidate.manager?.name}</div>
            <div>Номер счёта: {candidate.cardNumber ? candidate.cardNumber : "нет номера счёта"}</div>
            <div>Документы: {renderDocuments(candidate.documents)}</div>
            {/* <div>Старый Комментарий: {candidate?.comment}</div> */}
            <h3>Существующие комментарии</h3>
            {/* {renderComments(candidate.comment)} */}
            <ul className=" overflow-y-auto">
        {candidate?.comment.map((c, index) => (
          <li key={index}>{c.text} - {new Date(c.date).toLocaleString()}</li>
        ))}
      </ul>
          </div>
        </div>
      </div>
    </>
  );
}
