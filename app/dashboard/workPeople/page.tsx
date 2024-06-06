'use client';
import React, { useEffect, useState } from 'react';
import WorkCandidateTable from "@/app/ui/dashboard/WorkCandidateTable/WorkCandidateTable";
import ModalForm from '@/app/ui/dashboard/ModalForm/ModalForm';

async function fetchCandidates(status, managerName) {
  try {
    // const response = await fetch(`https://www.candidat.store/api/filtredCandidates?status=${status}&managerName=${managerName}`);
    const response = await fetch(`http://localhost:3000/api/filtredCandidates?status=${status}&managerName=${managerName}`);
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Отфильтрованные кандидаты", data);
    return data.candidates;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

const WorkPeoplePage = () => {
  const [dataLilia, setDataLilia] = useState([]);
  const [dataTatyana, setDataTatyana] = useState([]);
  const [dataDiana, setDataDiana] = useState([]);
  const [dataIvan, setDataIvan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const candidatesLilia = await fetchCandidates('На объекте', '661ce2eb0cc0e9a8e9261978'); // Correct manager ID
        const candidatesTatyana = await fetchCandidates('На объекте', '664af24f4edc695e88c2fe4e'); // Correct manager ID
        const candidatesDiana = await fetchCandidates('На объекте', '664af1c94edc695e88c2fe4b'); // Correct manager ID
        const candidatesIvan = await fetchCandidates('На объекте', '661ce21e0cc0e9a8e9261975'); // Correct manager ID

        setDataLilia(candidatesLilia);
        setDataTatyana(candidatesTatyana);
        setDataDiana(candidatesDiana);
        setDataIvan(candidatesIvan);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
<div className='text-center text-2xl'>Люди на обьекте</div>

      <div>Лилия</div>
      <WorkCandidateTable data={dataLilia} />
      <div>Татьяна</div>
      <WorkCandidateTable data={dataTatyana} />
      <div>Диана</div>
      <WorkCandidateTable data={dataDiana} />
      <div>Иван</div>
      <WorkCandidateTable data={dataIvan} />
    </div>
  );
};

export default WorkPeoplePage;
