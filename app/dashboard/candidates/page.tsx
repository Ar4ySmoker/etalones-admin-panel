'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

// async function deleteCandidate(candidateId: string): Promise<Response> {
//   const response = await fetch(`/api/deleteCandidate/route?candidateId=${candidateId}`, {
//     method: 'DELETE',
//   });
//   return response;
// }

function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchDocument, setSearchDocument] = useState('');  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const candidatesPerPage = 5;

  const fetchCandidates = async (page = 1, term = '', profession = '', document = '') => {
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
    fetchCandidates(currentPage, searchTerm, searchProfession, searchDocument);
  }, [currentPage, searchTerm, searchProfession, searchDocument]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };


  const handleSearchProfessionChange = (event) => {
    setSearchProfession(event.target.value.toLowerCase());
  };

  const handleSearchDocumentChange = (event) => {
    setSearchDocument(event.target.value.toLowerCase());
  };


  // useEffect(() => {
  //   fetchCandidates(currentPage, searchTerm);
  // }, [currentPage, searchTerm]);

  // const handleDeleteCandidate = async (candidateId) => {
  //   try {
  //     const response = await deleteCandidate(candidateId);
  //     if (response.ok) {
  //       alert('Кандидат успешно удален');
  //       setCandidates(candidates.filter(cand => cand._id !== candidateId));
  //     } else {
  //       throw new Error('Ошибка при удалении кандидата');
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };




  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value.toLowerCase());
  // };

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
    <div className="overflow-x-auto">
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
        <p>Loading...</p>
      ) : (
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
                          {renderProfessions(candidate.professions)}{" "}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{candidate.createdAt?.substring(0, 10)}</td>
                  <td>{renderDocuments(candidate.documents)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/candidates/edit/${candidate._id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          Редактировать
                        </button>
                      </Link>
                      <Link href={`/dashboard/candidates/${candidate._id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
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
          <div className="pagination join mt-4">
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
          </div>
        </>
      )}
     
    </div>
  );
}

export default CandidatesPage;
