// 'use client';

// import React, { useState, useEffect } from 'react';
// import styles from "@/app/ui/dashboard/users/users.module.css";
// import Link from "next/link";
// import PaginationC from '@/app/ui/dashboard/Pagination/PaginationC';
// import Modal from '@/app/ui/modals/globalModal/GlobalCandidateModal';
// import CandidateDetails from '@/app/ui/dashboard/CandidateDetails/CandidateDetails';
// import { FaCircleInfo } from "react-icons/fa6";
// import { MdOutlineMessage } from "react-icons/md";
// import CommentModal from '@/app/ui/modals/globalModal/CommentModal';


// // async function deleteCandidate(candidateId: string): Promise<Response> {
// //   const response = await fetch(`/api/deleteCandidate/route?candidateId=${candidateId}`, {
// //     method: 'DELETE',
// //   });
// //   return response;
// // }

// function CandidatesPage() {
//   const [candidates, setCandidates] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchPhone, setSearchPhone] = useState('');
//   const [searchProfession, setSearchProfession] = useState('');
//   const [searchDocument, setSearchDocument] = useState('');  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpenComment, setIsModalOpenComment] = useState(false);

//   const candidatesPerPage = 5;

//  // Функция для форматирования времени
//  const formatTime = (timeString) => {
//   if (!timeString) return '';

//   // Создаем новый объект Date из строки времени
//   const updatedAt = new Date(timeString);

//   // Добавляем 3 часа к времени
//   updatedAt.setHours(updatedAt.getHours());

//   // Получаем строку времени в формате HH:mm
//   const hours = String(updatedAt.getHours()).padStart(2, '0');
//   const minutes = String(updatedAt.getMinutes()).padStart(2, '0');
//   return `${hours}:${minutes}`;
// };

//   const fetchCandidates = async (page = 1, term = '', phone = '', profession = '', document = '') => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/candidates/search`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           page,
//           limit: candidatesPerPage,
//           searchTerm: term,
//           phone,
//           profession,
//           document,
//         }),
//       });
//       const data = await response.json();
//       setCandidates(data.candidates);
//       setCurrentPage(data.page);
//       setTotalPages(data.totalPages);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCandidates(currentPage, searchTerm, searchPhone, searchProfession, searchDocument);
//   }, [currentPage, searchTerm, searchPhone, searchProfession, searchDocument]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//   };

//   const handlePhoneSearchChange = (event) => {
//     setSearchPhone(event.target.value.toLowerCase());
//   };

//   const handleSearchProfessionChange = (event) => {
//     setSearchProfession(event.target.value.toLowerCase());
//   };

//   const handleSearchDocumentChange = (event) => {
//     setSearchDocument(event.target.value.toLowerCase());
//   };


//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleOpenModal = (candidate) => {
//     setSelectedCandidate(candidate);
//     setIsModalOpen(true);
//   };
//   const handleOpenModalComment = (candidate) => {
//     setSelectedCandidate(candidate);
//     setIsModalOpenComment(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedCandidate(null);
//   };

//   const handleCloseModalComment = () => {
//     setIsModalOpen(false);
//     setSelectedCandidate(null);
//   };
//   const renderDocuments = (documents) => {
//     if (!documents || documents.length === 0) {
//       return "нет документов";
//     }
//     return documents.map((doc, index) => (
//       <p key={index}>
//         <strong>{doc.docType}</strong>
//       </p>
//     ));
//   };

//   const renderProfessions = (professions) => {
//     if (!professions || professions.length === 0) {
//       return "нет профессий";
//     }
//     return professions.map((prof, index) => (
//       <p key={index} className="flex flex-col">
//         <p>{prof.name}</p>
//         <small className="badge badge-sm">{prof.experience}</small>
//       </p>
//     ));
//   };

//   return (
//     <div className="overflow-x-auto flex flex-col items-center">
//       <div className={styles.top}>
//       <input
//           type="text"
//           placeholder="Поиск по имени"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className={styles.searchInput}
//         />
//         <input
//           type="text"
//           placeholder="Поиск по телефону"
//           value={searchPhone}
//           onChange={handlePhoneSearchChange}
//           className={styles.searchInput}
//         />
//         <input
//           type="text"
//           placeholder="Поиск по профессии"
//           value={searchProfession}
//           onChange={handleSearchProfessionChange}
//           className={styles.searchInput}
//         />
//         <input
//           type="text"
//           placeholder="Поиск по документам"
//           value={searchDocument}
//           onChange={handleSearchDocumentChange}
//           className={styles.searchInput}
//         />
//         <Link href="/dashboard/candidates/add">
//           <button className={styles.addButton}>Добавить кандидата</button>
//         </Link>
//       </div>
//       {isLoading ? (
//         <p><span className="loading loading-spinner loading-md"></span> Загрузка</p>      ) : (
//         <>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Менеджер</th>
//                 <th>Имя</th>
//                 <th>Телефон</th>
//                 <th>Профессия</th>
//                 <th>Добавлен</th>
//                 <th>Документы</th>
//                 <th>Действия</th>
//               </tr>
//             </thead>
//             <tbody>
//               {candidates.map((candidate) => (
//                 <tr key={candidate._id}>
//                   <td className='flex flex-col gap-2'>
//                   <div className='badge-md w-max badge-outline font-bold'>{candidate.manager?.name}</div>
//                   <div className='flex flex-col gap-1'>Статус<span className='badge badge-ghost badge-sm w-max'>{candidate.status}</span> </div></td>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div>
//                         <div className="font-bold">{candidate.name}</div>
//                         <div className="text-sm opacity-50">
//                           В городе {candidate.locations}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{candidate.phone}</td>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div>
//                         <div className="font-bold">
//                           {renderProfessions(candidate.professions)}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td><div className='flex flex-col'>
//                   <p className='w-max'>{candidate.updatedAt?.substring(0, 10)}</p>
//                   <span className="badge badge-sm">{formatTime(candidate.updatedAt)}</span>
//                   </div></td>
//                   <td>
//                     <div className="badge badge-sm w-max py-3">
//                       <p>Гражданство <span className='font-bold'>{candidate.citizenship}</span></p>
//                       </div>
//                     <div className='text-center'>
//                       {renderDocuments(candidate.documents)}
//                       </div>
//                       </td>
//                   <td>
//                     <div className='flex flex-col gap-1 w-full'>
//                       <Link href={`/dashboard/candidates/edit/${candidate._id}`}>
//                         <button className="btn btn-sm btn-outline btn-error w-full">
//                           Редактировать
//                         </button>
//                       </Link>
//                  <div className='flex justify-between w-full ' >
//                   <div data-tip="Информация о кандидате" className='tooltip'>
//                   <button
//                         className="btn btn-sm btn-success bg-green-200 px-5 w-max"
//                         onClick={() => handleOpenModal(candidate)}
//                       >
//                         <FaCircleInfo />

//                       </button>
//                   </div>
//                 <div data-tip="Комментарий" className='tooltip '>
//                 <button
//                         className="btn btn-sm btn-primary bg-blue-400 px-5 w-max"
//                         onClick={() => handleOpenModalComment(candidate)}
//                       >
//                         <MdOutlineMessage />
//                       </button>
//                 </div>
                      
//                  </div>
                     
                    
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>        
//         </>
//       )}
//       <PaginationC currentPage={currentPage}
//       totalPages={totalPages}
//       onPageChange={handlePageChange}/>
//        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//         {selectedCandidate && <CandidateDetails candidate={selectedCandidate} />}
//       </Modal>
//       <Modal isOpen={isModalOpenComment} onClose={handleCloseModalComment}>
//       {selectedCandidate && <CommentModal candidate={selectedCandidate} />}      
//       </Modal>
//     </div>
//   );
// }

// export default CandidatesPage;
'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import PaginationC from '@/app/ui/dashboard/Pagination/PaginationC';
import Modal from '@/app/ui/modals/globalModal/GlobalCandidateModal';
import CandidateDetails from '@/app/ui/dashboard/CandidateDetails/CandidateDetails';
import { FaCircleInfo } from "react-icons/fa6";
import { MdAddTask, MdOutlineMessage } from "react-icons/md";
import CommentModal from '@/app/ui/modals/globalModal/CommentModal';
import SingleTaskModal from '@/app/ui/modals/globalModal/SingleTaskModal';

// Определите тип для кандидата
interface Candidate {
  _id: string;
  name: string;
  phone: string;
  professions: Array<{ name: string; experience: string }>;
  updatedAt?: string;
  documents?: Array<{ docType: string }>;
  citizenship: string;
  locations: string;
  manager?: { name: string };
  status?: string;
}

const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchDocument, setSearchDocument] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const [isModalOpenTask, setIsModalOpenTask] = useState(false);


  
  const candidatesPerPage = 5;

  // Функция для форматирования времени
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';

    const updatedAt = new Date(timeString);
    updatedAt.setHours(updatedAt.getHours());
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePhoneSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhone(event.target.value.toLowerCase());
  };

  const handleSearchProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProfession(event.target.value.toLowerCase());
  };

  const handleSearchDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDocument(event.target.value.toLowerCase());
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleOpenModalComment = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpenComment(true);
  };

  const handleOpenModalTask = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpenTask(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleCloseModalComment = () => {
    setIsModalOpenComment(false);
    setSelectedCandidate(null);
  };
  const handleCloseModalTask = () => {
    setIsModalOpenTask(false);
    setSelectedCandidate(null);
  };
  const renderDocuments = (documents?: Array<{ docType: string }>) => {
    if (!documents || documents.length === 0) {
      return "нет документов";
    }
    return documents.map((doc, index) => (
      <p key={index}>
        <strong>{doc.docType}</strong>
      </p>
    ));
  };

  const renderProfessions = (professions?: Array<{ name: string; experience: string }>) => {
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
        <p><span className="loading loading-spinner loading-md"></span> Загрузка</p>
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
                    <div className='flex flex-col gap-1'>Статус<span className='badge badge-ghost badge-sm w-max'>{candidate.status}</span></div>
                  </td>
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
                  <td>
                    <div className='flex flex-col'>
                      <p className='w-max'>{candidate.updatedAt?.substring(0, 10)}</p>
                      <span className="badge badge-sm">{formatTime(candidate.updatedAt)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-sm w-max py-3">
                      <p>Гражданство <span className='font-bold'>{candidate.citizenship}</span></p>
                    </div>
                    <div className='text-center'>
                      {renderDocuments(candidate.documents)}
                    </div>
                  </td>
                  <td>
                    <div className='flex flex-col gap-1 w-full'>
                      <Link href={`/dashboard/candidates/edit/${candidate._id}`}>
                        <button className="btn btn-sm btn-outline btn-error w-full">
                          Редактировать
                        </button>
                      </Link>
                      <div className="tooltip" data-tip="Информация о кандидате">

                      <button
                        className="btn btn-sm btn-outline btn-info w-full"
                        onClick={() => handleOpenModal(candidate)}
                      >
                        <FaCircleInfo />
                      </button>
                      </div>
                      <div className='flex justify-between '>
                      <div className="tooltip" data-tip="Добавить комментарий">

                      <button
                        className="btn btn-sm btn-outline btn-success"
                        onClick={() => handleOpenModalComment(candidate)}
                      >
                        <MdOutlineMessage />
                      </button> 
                      </div>
                      <div className="tooltip" data-tip="Поставить задачу">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleOpenModalTask(candidate)}
                        >
                        <MdAddTask />
                      </button>
                        </div>
                      </div>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <PaginationC
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isModalOpen && selectedCandidate && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CandidateDetails candidate={selectedCandidate} />
        </Modal>
      )}

      {isModalOpenComment && selectedCandidate && (
        <Modal isOpen={isModalOpenComment} onClose={handleCloseModalComment}>
          <CommentModal candidate={selectedCandidate} id={selectedCandidate._id} onClose={handleCloseModalComment} />
        </Modal>
      )}
      {isModalOpenTask && selectedCandidate && (
        <Modal isOpen={isModalOpenTask} onClose={handleCloseModalTask}>
          <SingleTaskModal candidate={selectedCandidate} onClose={handleCloseModalTask} />
        </Modal>
      )}
    </div>
  );
};

export default CandidatesPage;
