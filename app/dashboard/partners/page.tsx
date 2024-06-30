'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

// async function deletePartner(partnerId: string): Promise<Response> {
//   const response = await fetch(`/api/deletePartner/route?partnerId=${partnerId}`, {
//     method: 'DELETE',
//   });
//   return response;
// }

function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const partnersPerPage = 5;

  const fetchPartners = async (page = 1, term = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/partners/search`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          limit: partnersPerPage,
          searchTerm: term,
        }),
      });
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };





  return (
    <div className="overflow-x-auto">
      <div className={styles.top}>
        <input
          type="text"
          placeholder="Search for a Partner..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <Link href="/dashboard/partners/add">
          <button className={styles.addButton}>Добавить Заказчика</button>
        </Link>
      </div>
      {isLoading ? (
        <p><span className="loading loading-spinner loading-md"></span> Загрузка</p> 
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Менеджер</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Вакансии</th>
                <th>Комментарий</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner._id}>
                  <td className='flex flex-col gap-2 items-start'>
                  <div className='badge-md w-max badge-outline font-bold'>Менеджер {partner.manager?.name}</div>
                  <div className='flex flex-col gap-1'>Статус Заказчика<span className='badge badge-ghost badge-sm w-max'>{partner.status}</span> </div>
                  <div className='flex flex-col gap-1'><span className='badge badge-ghost badge-sm w-max'>Жильё {partner.rentPrice}</span> </div>
                  <div className='flex flex-col gap-1'><span className='badge badge-ghost badge-sm w-max'>Локация {partner.location}</span> </div>
                  </td>
                  <td className='w-max'>
                    <div className="flex items-start gap-3">
                      <div >
                        <div className="font-bold">{partner.name}</div>
                        <div className="text-sm opacity-50 w-full">
                          {partner.companyName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{partner.phone}</td> 
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                        {partner.professions.map(profession => (
          <p className='py-1' key={profession._id}>{profession.name}</p>
        ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{partner.comment}</td>
                
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
