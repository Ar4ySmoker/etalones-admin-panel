'use client';
import React, { useEffect, useState } from 'react';

async function fetchPartnersAndCandidates() {
  try {
    const response = await fetch('/api/candidateFromPartner');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.partners;
  } catch (error) {
    console.error('Error fetching partners and candidates:', error);
    throw error;
  }
}

const PartnersCandidatesPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPartners = await fetchPartnersAndCandidates();
        setPartners(fetchedPartners);
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
      <h1 className='text-center text-2xl'>Партнёры и их кандидаты</h1>
      {partners.map(partner => (
        <div key={partner._id} className='mb-8'>
          <h2 className='text-xl'>{partner.companyName}</h2>
          <ul>
            {partner.candidates.map(candidate => (
              <li key={candidate._id}>
                {candidate.name} - {candidate.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PartnersCandidatesPage;
