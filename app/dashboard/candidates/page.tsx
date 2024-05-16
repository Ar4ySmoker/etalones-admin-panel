'use client'

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { AddCommentForm } from '@/app/ui/dashboard/AddCommentForm/AddCommentForm';
async function deleteCandidate(candidateId: string): Promise<Response> {
  const response = await fetch(`/api/deleteCandidate/route?candidateId=${candidateId}`, {
    method: 'DELETE',
  });
  return response;
}
function CandidatesPage() {


  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const candidatesPerPage = 5;
  
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name?.toLowerCase().includes(searchTerm) ||
    candidate.phone?.includes(searchTerm) ||
    candidate.locationName?.toLowerCase().includes(searchTerm) ||
    candidate.professionName?.toLowerCase().includes(searchTerm)
  );
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCandidates.length / candidatesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <p key={index}>
        <strong>{doc.docType}</strong>
      </p>
    ));
  };
  const renderProfessions = (professions) => {
    if (!professions || professions.length === 0) {
      return "нет профессий";
    }
    return professions.map((prof, index) => (
      <p key={index} className='flex flex-col'>
        <p>{prof.name}</p>
        <small className='badge badge-sm'>{prof.experience}</small>
      </p>
    ));
  };
  

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const endpoints = ["candidates", "profession", "locations",  "manager", "status", "langue", "commentMng"];
        const baseUrl = "https://www.candidat.store/api/";
        const responses = await Promise.all(endpoints.map(endpoint => fetch(baseUrl + endpoint)));
        if (responses.some(response => !response.ok)) {
          throw new Error('Failed to fetch some endpoints');
        }
        const data = await Promise.all(responses.map(response => response.json()));
        const [candidates, profession, locations,  manager, status, commentMng] = data;

        const locationMap = Object.fromEntries(locations.map(loc => [loc._id, loc.name]));
        const professionMap = Object.fromEntries(profession.map(prof => [prof._id, { name: prof.name, description: prof.description }]));
        const managerMap = Object.fromEntries(manager.map(mng => [mng._id, mng.name]));
        const statusMap = Object.fromEntries(status.map(st => [st._id, st.name]));
        const commentMngMap = Object.fromEntries(commentMng.map(cmt => [cmt._id, { text: cmt.commentText, createdAt: cmt.createdAt }]));
        
        setCandidates(candidates.map(candidate => ({
          ...candidate,
          locationName: locationMap[candidate.locations],
          professionName: professionMap[candidate.profession]?.name || "Без профессии",
          professionDescription: professionMap[candidate.profession]?.description || "Нет описания",
          managerName: managerMap[candidate.manager] || "Без менеджера",
          statusName: statusMap[candidate.status] || "Не обработан",
          commentMngNames: candidate.commentMng.map(id => commentMngMap[id] || "Неизвестный комментарий")
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromApi();
  }, []);
  const handleDeleteCandidate = async (candidateId) => {
    try {
      // Предположим, что deleteCandidate уже имплементирована
      const response = await deleteCandidate(candidateId);
      if (response.ok) {
        alert('Кандидат успешно удален');
        setModalOpen(false); // Закрываем модальное окно после успешного удаления
        setCandidates(candidates.filter(cand => cand._id !== candidateId)); // Обновляем список кандидатов
      } else {
        throw new Error('Ошибка при удалении кандидата');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleOpenModal = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  
  return (
    <div className="overflow-x-auto">
      <div className={styles.top}>
        <input type="text" placeholder="Search for a Candidate..." value={searchTerm} onChange={handleSearchChange} className={styles.searchInput} />
        <Link href="/dashboard/candidates/add">
          <button className={styles.addButton}>Добавить кандидата</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Профессия</th>
            <th>Добавлен</th>
            <th>Документы</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map(candidate => (
            <tr key={candidate._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{candidate.name}</div>
                    <div className="text-sm opacity-50">В городе {candidate.locations}</div>
                  </div>
                </div>
              </td>
              <td>{candidate.phone}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{renderProfessions(candidate.professions)} </div>
                  </div>
                </div>
              </td>
              <td>{candidate.createdAt?.substring(0, 10)}</td>
<td>{renderDocuments(candidate.documents)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/candidates/edit/${candidate._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Редактировать</button>
                  </Link>
                  <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.view}`} onClick={() => handleOpenModal(candidate)}>Подробнее</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination join mt-4">
        {pageNumbers.map(number => (
          <input
            key={number}
            type="radio"
            name="options"
            aria-label={`${number}`}
            className={`join-item btn btn-square ${currentPage === number ? 'btn-primary' : ''}`}
            onClick={() => paginate(number)}
            checked={currentPage === number}
            readOnly
          />
        ))}
      </div>
      {modalOpen && selectedCandidate && (
        <dialog className="modal" open>
          <div className="modal-box bg-white ">
            <h3 className="card-title">Информация о кандидате</h3>
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-2 " onClick={handleCloseModal}>✕</button>
          <div className='flex justify-between '>
          <p>Менеджер: {selectedCandidate.managerName}</p>
          <div className='badge-ghost badge-sm '>Добавлен: {typeof selectedCandidate.createdAt === 'string' ? selectedCandidate.createdAt.substring(0, 10) : 'Неизвестно'}</div>
            </div>
            <div className='flex content-between '>
                <div className="py-4 flex flex-col">
              <p><strong>Имя:</strong> {selectedCandidate.name}</p>
              <p><strong>Возраст:</strong> {selectedCandidate.age}</p>
              <p ><strong>Профессия:</strong> {renderProfessions(selectedCandidate.professions)}</p>
              <p><strong>Город:</strong> {selectedCandidate.locations}</p>
              
              <p><strong>Статус:</strong> {selectedCandidate.status}</p>
              <p><strong>Язык:</strong> {selectedCandidate.langue.name} {selectedCandidate.langue.level}</p>
              <p><strong>Водительское Удостоверение:</strong> {selectedCandidate.drivePermis}</p>
              <p><strong>Готов выехать:</strong> {typeof selectedCandidate.leaving === 'string' ? selectedCandidate.leaving.substring(0, 10) : 'Неизвестно'}</p>
              <p><strong>Комментарий:</strong> {selectedCandidate.comment}</p>
              <p><strong>Комментарии менеджера:</strong></p>
              <ul>
  {selectedCandidate.commentMngNames.map((comment, index) => (
    <li key={index}>
      {comment.text} - <small>{new Date(comment.createdAt).toLocaleDateString("ru-RU")}</small>
    </li>
  ))}
</ul>
                </div> 
                 <div className="py-4 flex flex-col">
            <p className='badge badge-md'><strong>Телефон:</strong> {selectedCandidate.phone}</p>
            <p className='text-sm'>Документы:</p>
            {selectedCandidate.documents && selectedCandidate.documents.map((doc, index) => (
                <p key={index} className='text-sm '>
                  --{doc.docType} {doc.numberDoc} <br/> <span className='badge badge-sm'>действует до {doc.dateExp}</span>
                </p>
              ))}
                 </div>
            </div>
              <AddCommentForm candidateId={selectedCandidate._id} />
              <button onClick={() => handleDeleteCandidate(selectedCandidate._id)} className={styles.deleteCandidate}>Удалить</button>

            </div>
            
          
        </dialog>
      )}
    </div>
    
  );
}

export default CandidatesPage;
