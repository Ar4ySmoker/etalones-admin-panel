'use client'
import CandidatsTable from "../ui/dashboard/Tables/CandidatsTable";
import { useState, useEffect } from 'react';
const fetchCandidates = async (source) => {
  const url = source ? `/api/filtredCandidates?source=${source}` : '/api/candidates';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }
  const data = await response.json();
  return data.candidates;
};

const Dashboard = () => {
  const [siteCandidates, setSiteCandidates] = useState([]);
  const [facebookCandidates, setFacebookCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async (source, setter) => {
      try {
        const candidatesData = await fetchCandidates(source);
        setter(candidatesData);
      } catch (error) {
        console.error('Failed to fetch candidates', error);
      }
    };

    getCandidates('сайт', setSiteCandidates);
    getCandidates('facebook', setFacebookCandidates);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-lg">Кандидаты с сайта</h2>
      <CandidatsTable candidates={siteCandidates} />

      <h2 className="font-bold text-lg">Кандидаты с Facebook</h2>
      <CandidatsTable candidates={facebookCandidates} />
    </div>
  );
};

export default Dashboard;
