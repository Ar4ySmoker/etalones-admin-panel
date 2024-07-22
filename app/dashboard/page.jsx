'use client'
// import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
// import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import {useState, useEffect} from 'react'

const fetchCandidates = async (status) => {
  const url = status ? `/api/filtredCandidates?status=${status}` : '/api/candidates';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }
  const data = await response.json();
  return data.candidates;
};
const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const candidatesData = await fetchCandidates('Ждёт работу');
        setCandidates(candidatesData);
      } catch (error) {
        console.error('Failed to fetch candidates', error);
      }
    };

    getCandidates();
  }, []);

  
  return (
    
    <div>
      <Transactions candidates={candidates}/>
    </div>
  );
};

export default Dashboard;
