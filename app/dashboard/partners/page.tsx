'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

async function deletePartner(partnerId: string): Promise<Response> {
  const response = await fetch(`/api/deletePartner/route?partnerId=${partnerId}`, {
    method: 'DELETE',
  });
  return response;
}

function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const partnersPerPage = 5;

  const fetchPartners = async (page = 1, term = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/partners?page=${page}&limit=${partnersPerPage}&searchTerm=${term}`);
      const data = await response.json();
      setPartners(data.partners);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleDeletePartner = async (partnerId) => {
    try {
      const response = await deletePartner(partnerId);
      if (response.ok) {
        alert('Кандидат успешно удален');
        setModalOpen(false);
        setPartners(partners.filter(part => part._id !== partnerId));
      } else {
        throw new Error('Ошибка при удалении кандидата');
      }
    } catch (error) {
      alert(error.message);
    }
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
        <Link href="/dashboard/partners/add">
          <button className={styles.addButton}>Добавить Заказчика</button>
        </Link>
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Менеджер</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Название фирмы</th>
                <th>Сумма контракта</th>
                <th>Профессии</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner._id}>
                  <td className='flex flex-col gap-2'>
                  <div className='badge-md w-max badge-outline font-bold'>{partner.manager.name}</div>
                  <div className='flex flex-col gap-1'>Статус<span className='badge badge-ghost badge-sm w-max'>{partner.status}</span> </div></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{partner.name}</div>
                        <div className="text-sm opacity-50">
                          В городе {partner.locations}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{partner.phone}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                          {renderProfessions(partner.professions)}{" "}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/partners/edit/${partner._id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          Редактировать
                        </button>
                      </Link>
                      <Link href={`/dashboard/partners/${partner._id}`}>
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

export default PartnersPage;
