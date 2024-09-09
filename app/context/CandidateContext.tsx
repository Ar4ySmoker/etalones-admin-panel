// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface Candidate {
//   _id: string;
//   name: string;
//   phone: string;
//   professions: { name: string; experience: string }[];
//   documents: { docType: string }[];
//   updatedAt: string;
//   manager?: { name: string };
//   status?: string;
//   locations?: string;
//   citizenship?: string;
// }

// interface CandidateContextType {
//   candidates: Candidate[];
//   candidate: Candidate | null;
//   currentPage: number;
//   totalPages: number;
//   setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
//   fetchAllCandidates: (page: number, limit: number) => Promise<void>;
//   fetchCandidateById: (id: string) => Promise<void>;
//   logCandidates: () => void; // Добавьте эту строку
//   handlePageChange: (page: number) => void;
// }

// const CandidateContext = createContext<CandidateContextType | undefined>(undefined);
// export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [candidate, setCandidate] = useState<Candidate | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const fetchAllCandidates = async (page: number, limit: number) => {
//     try {
//       const response = await fetch(`/api/candidates?page=${page}&limit=${limit}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCandidates(data.candidates);
//       setTotalPages(data.totalPages);
//       setCurrentPage(data.page);
//     } catch (error) {
//       console.error('Error fetching candidates:', error);
//     }
//   };

//   const fetchCandidateById = async (id: string) => {
//     try {
//       const response = await fetch(`/api/candidates/${id}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCandidate(data.candidate); // Обратите внимание, что мы используем data.candidate
//     } catch (error) {
//       console.error('Error fetching candidate:', error);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     fetchAllCandidates(page, 5);
//   };

//   useEffect(() => {
//     fetchAllCandidates(currentPage, 5); // Инициализация данных при первом рендере
//   }, [currentPage]);

//   return (
//     <CandidateContext.Provider value={{ 
//       candidates, 
//       candidate, 
//       currentPage, 
//       totalPages, 
//       setCandidate, 
//       fetchAllCandidates, 
//       fetchCandidateById, 
//       logCandidates,
//       handlePageChange
//     }}>
//       {children}
//     </CandidateContext.Provider>
//   );
// };


// export const useCandidate = (): CandidateContextType => {
//   const context = useContext(CandidateContext);
//   if (context === undefined) {
//     throw new Error('useCandidate must be used within a CandidateProvider');
//   }
//   return context;
// };
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Candidate {
  _id: string;
  name: string;
  phone: string;
  professions: { name: string; experience: string }[];
  documents: { docType: string }[];
  updatedAt: string;
  manager?: { name: string };
  status?: string;
  locations?: string;
  citizenship?: string;
}

interface CandidateContextType {
  candidates: Candidate[];
  candidate: Candidate | null;
  currentPage: number;
  totalPages: number;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  fetchAllCandidates: (page: number, limit: number) => Promise<void>;
  fetchCandidateById: (id: string) => Promise<void>;
  logCandidates: () => void; // Добавьте эту строку
  handlePageChange: (page: number) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchAllCandidates = async (page: number, limit: number) => {
    try {
      const response = await fetch(`/api/candidates?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCandidates(data.candidates);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchCandidateById = async (id: string) => {
    try {
      const response = await fetch(`/api/candidates/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCandidate(data.candidate);
    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
  };

  const logCandidates = () => {
    console.log('All candidates:', candidates);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAllCandidates(page, 5);
  };

  useEffect(() => {
    fetchAllCandidates(currentPage, 5);
  }, [currentPage]);

  return (
    <CandidateContext.Provider value={{ 
      candidates, 
      candidate, 
      currentPage, 
      totalPages, 
      setCandidate, 
      fetchAllCandidates, 
      fetchCandidateById, 
      logCandidates,
      handlePageChange
    }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = (): CandidateContextType => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
};
