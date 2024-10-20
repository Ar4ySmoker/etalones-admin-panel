'use client';
import React, { useEffect, useState } from 'react';
import BlackListC from '@/app/ui/dashboard/BlackList/BlackListC';
import BlackListP from '@/app/ui/dashboard/BlackList/BlackListP';

async function fetchCandidates(status) {
  try {
    const response = await fetch(`https://www.candidat.store/api/filtredCandidates?status=${status}`);
    // const response = await fetch(`http://localhost:3000/api/blackListC?status=${status}`);
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}
async function fetchPartners(status) {
    try {
      const response = await fetch(`https://www.candidat.store/api/filtredCandidates?status=${status}`);
      // const response = await fetch(`http://localhost:3000/api/blackListP?status=${status}`);
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.partners;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  }

const BlackListPage = () => {
  const [dataBLC, setDataBLC] = useState([]);
  const [dataBLP, setDataBLP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [candidatesBLС, partnersBLС] = await Promise.all([
          fetchCandidates('В ЧС'),
          fetchPartners('В ЧС')
        ]);
     
        setDataBLC(candidatesBLС);
        setDataBLP(partnersBLС);
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
<div className='text-center text-2xl'>Чёрный список</div>
      <div>Кндидаты</div>
      <BlackListC data={dataBLC} />
      <div>Заказчики</div>
      <BlackListP data={dataBLP} />
    </div>
  );
};

export default BlackListPage;
