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

const WorkCandidateTable = () => {
 






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
      
        </tbody>
      </table>
      <div className="pagination">
        
      </div>
    </div>
  );
};

export default WorkCandidateTable;
