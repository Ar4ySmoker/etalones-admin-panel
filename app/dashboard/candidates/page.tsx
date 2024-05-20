'use client';

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
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const candidatesPerPage = 5;

  const fetchCandidates = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/candidates?page=${page}&limit=${candidatesPerPage}`);
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
    fetchCandidates(currentPage);
  }, [currentPage]);

  const handleDeleteCandidate = async (candidateId) => {
    try {
      const response = await deleteCandidate(candidateId);
      if (response.ok) {
        alert('Кандидат успешно удален');
        setModalOpen(false);
        setCandidates(candidates.filter(cand => cand._id !== candidateId));
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
          placeholder="Search for a Candidate..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
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
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{candidate.name}</div>
                    <div className="text-sm opacity-50">
                      В городе {candidate.locationName}
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
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view}`}
                      onClick={() => handleOpenModal(candidate)}
                    >
                      Подробнее
                    </button>
                  </div>
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
      {modalOpen && selectedCandidate && (
        <dialog className="modal" open>
          <div className="modal-box bg-white ">
            <h3 className="card-title">Информация о кандидате</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-0 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <div className="flex justify-between">
              <p>Менеджер: {selectedCandidate.managerName}</p>
              <div className="badge-ghost badge-sm">
                Добавлен:{" "}
                {typeof selectedCandidate.createdAt === "string"
                  ? selectedCandidate.createdAt.substring(0, 10)
                  : "Неизвестно"}
              </div>
            </div>
            <div className="flex content-between">
              <div className="py-4 flex flex-col">
                <p>
                  <strong>Имя:</strong> {selectedCandidate.name}
                </p>
                <p>
                  <strong>Возраст:</strong> {selectedCandidate.age}
                </p>
                <p>
                  <strong>Профессия:</strong>{" "}
                  {renderProfessions(selectedCandidate.professions)}
                </p>
                <p>
                  <strong>Город:</strong> {selectedCandidate.locationName}
                </p>
                <p>
                  <strong>Статус:</strong> {selectedCandidate.statusName}
                </p>
                <p>
                  <strong>Язык:</strong> {selectedCandidate.langue.name}{" "}
                  {selectedCandidate.langue.level}
                </p>
                <p>
                  <strong>Водительское Удостоверение:</strong>{" "}
                  {selectedCandidate.drivePermis}
                </p>
                <p>
                  <strong>Готов выехать:</strong>{" "}
                  {typeof selectedCandidate.leaving === "string"
                    ? selectedCandidate.leaving.substring(0, 10)
                    : "Неизвестно"}
                </p>
                <p>
                  <strong>Комментарий:</strong> {selectedCandidate.comment}
                </p>
                <p>
                  <strong>Комментарии менеджера:</strong>
                </p>
                <ul>
                  {selectedCandidate.commentMngNames.map((comment, index) => (
                    <li key={index}>
                      {comment.text} -{" "}
                      <small>
                        {new Date(comment.createdAt).toLocaleDateString("ru-RU")}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-4 flex flex-col">
                <p className="badge badge-md">
                  <strong>Телефон:</strong> {selectedCandidate.phone}
                </p>
                <p className="text-sm">Документы:</p>
                {selectedCandidate.documents &&
                  selectedCandidate.documents.map((doc, index) => (
                    <p key={index} className="text-sm">
                      --{doc.docType} {doc.numberDoc} <br />
                      <span className="badge badge-sm">
                        действует до {doc.dateExp}
                      </span>
                    </p>
                  ))}
              </div>
            </div>
            <AddCommentForm candidateId={selectedCandidate._id} />
            <button
              onClick={() => handleDeleteCandidate(selectedCandidate._id)}
              className={styles.deleteCandidate}
            >
              Удалить
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default CandidatesPage;
