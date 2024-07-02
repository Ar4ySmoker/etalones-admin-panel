'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import PaginationC from '@/app/ui/dashboard/Pagination/PaginationC';

// async function deleteCandidate(candidateId: string): Promise<Response> {
//   const response = await fetch(`/api/deleteCandidate/route?candidateId=${candidateId}`, {
//     method: 'DELETE',
//   });
//   return response;
// }

function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchDocument, setSearchDocument] = useState('');  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const candidatesPerPage = 5;

 // Функция для форматирования времени
 const formatTime = (timeString) => {
  if (!timeString) return '';

  // Создаем новый объект Date из строки времени
  const updatedAt = new Date(timeString);

  // Добавляем 3 часа к времени
  updatedAt.setHours(updatedAt.getHours());

  // Получаем строку времени в формате HH:mm
  const hours = String(updatedAt.getHours()).padStart(2, '0');
  const minutes = String(updatedAt.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

  const fetchCandidates = async (page = 1, term = '', phone = '', profession = '', document = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/candidates/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          limit: candidatesPerPage,
          searchTerm: term,
          phone,
          profession,
          document,
        }),
      });
      const data = await response.json();
      setCandidates(data.candidates);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates(currentPage, searchTerm, searchPhone, searchProfession, searchDocument);
  }, [currentPage, searchTerm, searchPhone, searchProfession, searchDocument]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePhoneSearchChange = (event) => {
    setSearchPhone(event.target.value.toLowerCase());
  };

  const handleSearchProfessionChange = (event) => {
    setSearchProfession(event.target.value.toLowerCase());
  };

  const handleSearchDocumentChange = (event) => {
    setSearchDocument(event.target.value.toLowerCase());
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      <p key={index} className="flex flex-col">
        <p>{prof.name}</p>
        <small className="badge badge-sm">{prof.experience}</small>
      </p>
    ));
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center">
      <div className={styles.top}>
      <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Поиск по телефону"
          value={searchPhone}
          onChange={handlePhoneSearchChange}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Поиск по профессии"
          value={searchProfession}
          onChange={handleSearchProfessionChange}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Поиск по документам"
          value={searchDocument}
          onChange={handleSearchDocumentChange}
          className={styles.searchInput}
        />
        <Link href="/dashboard/candidates/add">
          <button className={styles.addButton}>Добавить кандидата</button>
        </Link>
      </div>
      {isLoading ? (
        <p><span className="loading loading-spinner loading-md"></span> Загрузка</p>      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Менеджер</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Профессия</th>
                <th>Добавлен</th>
                <th>Документы</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td className='flex flex-col gap-2'>
                  <div className='badge-md w-max badge-outline font-bold'>{candidate.manager?.name}</div>
                  <div className='flex flex-col gap-1'>Статус<span className='badge badge-ghost badge-sm w-max'>{candidate.status}</span> </div></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{candidate.name}</div>
                        <div className="text-sm opacity-50">
                          В городе {candidate.locations}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{candidate.phone}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                          {renderProfessions(candidate.professions)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><div className='flex flex-col'>
                  <p className='w-max'>{candidate.updatedAt?.substring(0, 10)}</p>
                  <span className="badge badge-sm">{formatTime(candidate.updatedAt)}</span>
                  </div></td>
                  <td>
                    <div className="badge badge-sm w-max py-3">
                      <p>Гражданство <span className='font-bold'>{candidate.citizenship}</span></p>
                      </div>
                    <div className='text-center'>
                      {renderDocuments(candidate.documents)}
                      </div>
                      </td>
                  <td>
                    <div className={styles.buttons}>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="pagination join mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <input
                  key={number}
                  type="radio"
                  name="options"
                  aria-label={`${number}`}
                  className={`join-item btn btn-square ${
                    currentPage === number ? "btn-primary" : ""
                  }`}
                  onClick={() => handlePageChange(number)}
                  checked={currentPage === number}
                  readOnly
                />
              )
            )}
          </div> */}
          
        </>
      )}
      <PaginationC currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}/>
    </div>
  );
}

export default CandidatesPage;
