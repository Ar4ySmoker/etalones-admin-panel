'use client'
import { useState, useEffect } from "react";

interface Manager {
  _id: string;
  name: string;
  phone: string;
}

interface Candidate {
  _id: string;
  name: string;
  manager: Manager;
  status: string;
  // другие поля, если необходимо
}

interface WorkCandidateTableProps {
  initialCandidates: Candidate[];
  initialPage: number;
  totalPages: number;
  status: string;
  managerName: string;
}

const WorkCandidateTable = ({ initialCandidates, initialPage, totalPages, status, managerName }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPagesState, setTotalPagesState] = useState(totalPages);
  // const [isLoading, setIsLoading] = useState(false);

  const candidatesPerPage = 5;

  // const fetchCandidates = async (page = 1, status = '', managerName = '') => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`/api/candidates?page=${page}&limit=${candidatesPerPage}&status=${status}&managerName=${managerName}`);
  //     const data = await response.json();
  //     setCandidates(data.candidates || []);
  //     setCurrentPage(data.page || 1);
  //     setTotalPagesState(data.totalPages || 1);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCandidates(currentPage, status, managerName);
  // }, [currentPage, status, managerName]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {candidates && candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={candidate._id}>
                <th>{index + 1 + (currentPage - 1) * candidatesPerPage}</th>
                <td>{candidate.name}</td>
                <td>{candidate.manager.name}</td> {/* Отображаем имя менеджера */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No candidates found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPagesState }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkCandidateTable;
