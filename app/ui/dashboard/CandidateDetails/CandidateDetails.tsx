
export default function CandidateDetails({ candidate }) {
  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <p key={index} className='flex flex-col'>
        <p>{prof.name}</p>
        <small>{prof.experience}</small>
      </p>
    ));
  };
  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <p key={index} className='flex flex-col'>
        <p>{doc.docType}</p>
        <p>{doc.dateExp}</p>
      </p>
    ));
  };
 


 
    return (
        <>
        <div className="">
            <h1 className="font-bold py-10 text-2xl">Update Candidate</h1>
        </div>
        <div >
        <div >
          <div className='flex flex-col w-full'>
          
<div >Имя: {candidate.name}</div>
<div>Возраст: {candidate.age}</div>
<div >Номер телефона: {candidate.phone}</div>
<div>Местоположение: {candidate.locations}</div>
<div>Знание языка: {candidate.langue.name}</div>
<div>Статус: {candidate.status}</div>
<div>Статус трудоустройства: <span>{candidate.statusFromPartner.status}</span>работает <span>{candidate.statusFromPartner.who}</span></div>
<div>Менеджер: {candidate.manager.name}</div>
<div>Номер счёта: {candidate.cardNumber}</div>
<div>Профессии: {renderProfessions(candidate.professions)}</div>
<div>Документы: {renderDocuments(candidate.documents)}</div>
          </div>
        </div>          
        </div>
        </>
    );
}
