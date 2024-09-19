'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import ManagerSelect from '@/app/ui/dashboard/ManagerCard/ManagerSelect';
import TextInput from '../inputs/TextInput/TextInput';

export default function Account() {
  const { data: session, status } = useSession();
  const [managers, setManagers] = useState<any[]>([]);
  const [matchedManager, setMatchedManager] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]); // Новый стейт для партнёров
  const [isLoadingManagers, setIsLoadingManagers] = useState(true);

  const checkForMatchingManager = useCallback((managers: any[], userEmail: string) => {
    const manager = managers.find(mgr => mgr.email === userEmail);
    if (manager) {
      setMatchedManager(manager);
      fetchCandidatesForManager(manager.candidates);
      fetchPartnersForManager(manager.partners); // Получаем партнёров
    }
  }, []);

  const fetchCandidatesForManager = async (candidateIds: string[]) => {
    try {
      const candidatePromises = candidateIds.map(async (id) => {
        // const response = await fetch(`http://localhost:3000/api/candidates/${id}`);
        const response = await fetch(`https://www.candidat.store/api/candidates/${id}`);

        const data = await response.json();
        return data.candidate;
      });

      const candidatesData = await Promise.all(candidatePromises);
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchPartnersForManager = async (partnerIds: string[]) => {
    try {
      const partnerPromises = partnerIds.map(async (id) => {
        // const response = await fetch(`http://localhost:3000/api/partners/${id}`);
        const response = await fetch(`https://www.candidat.store/api/partners/${id}`);

        const data = await response.json();
        return data.partner;
      });

      const partnersData = await Promise.all(partnerPromises);
      setPartners(partnersData);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/manager');
        const response = await fetch('https://www.candidat.store/api/manager');

        const data = await response.json();

        if (Array.isArray(data.managers)) {
          setManagers(data.managers);
          setIsLoadingManagers(false);
          checkForMatchingManager(data.managers, session?.user?.email);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setIsLoadingManagers(false);
      }
    };

    if (session) {
      fetchManagers();
    }
  }, [session, checkForMatchingManager]);

  if (status === "loading" || isLoadingManagers) {
    return <p>Loading...!</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <>
      <div>
        <h1>Account</h1>
        <p>Email: {session.user.email}</p>
        {matchedManager ? (
          <div>
            <h2>Welcome, {matchedManager.name}!</h2>
          </div>
        ) : (
          <>
            <p>Вы не менеджер и у вас нет доступа к приложению</p>
            <TextInput id='request' title='Запрос доступа' placeholder='Ваша почта example@gmail.com' />
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        <h2 className='text-2xl font-bold mb-4'>Список кандидатов</h2>
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Партнёр</th>
              <th>Местоположение</th>
              <th>Документы</th>
              <th>Профессии</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr key={candidate._id}>
                  <th>{index + 1}</th>
                  <td>{candidate.name}</td>
                  <td>{candidate.phone || 'N/A'}</td>
                  <td>{candidate?.partners?.companyName || 'N/A'}</td>
                  <td>{candidate.locations}</td>
                  <td>
                    {candidate.documents.map(doc => doc.name).join(', ') || 'Нет документов'}
                  </td>
                  <td>
                    {candidate.professions.map(prof => prof.name).join(', ') || 'Нет профессий'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Нет кандидатов, назначенных этому менеджеру.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <h2 className='text-2xl font-bold mb-4'>Список партнёров</h2>
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Электронная почта</th>
              <th>Местоположение</th>
            </tr>
          </thead>
          <tbody>
            {partners.length > 0 ? (
              partners.map((partner, index) => (
                <tr key={partner._id}>
                  <th>{index + 1}</th>
                  <td>{partner.name}</td>
                  <td>{partner.phone || 'N/A'}</td>
                  <td>{partner.email || 'N/A'}</td>
                  <td>{partner.location || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Нет партнёров, назначенных этому менеджеру.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
