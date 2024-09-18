'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ManagerSelect from '@/app/ui/dashboard/ManagerCard/ManagerSelect';
import TextInput from '../inputs/TextInput/TextInput';

export default function Account() {
  const { data: session, status } = useSession();
  const [managers, setManagers] = useState([]);
  const [matchedManager, setMatchedManager] = useState(null);
  const [isLoadingManagers, setIsLoadingManagers] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/manager');
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
  }, [session]);

  const checkForMatchingManager = (managers, userEmail) => {
    const manager = managers.find(mgr => mgr.email === userEmail);
    if (manager) {
      setMatchedManager(manager);
    }
  };

  if (status === "loading" || isLoadingManagers) {
    return <p>Loading...!</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <h1>Account</h1>
      <p>Email: {session.user.email}</p>
      {matchedManager ? (
        <div>
          <h2>Welcome, {matchedManager.name}!</h2>
          <ManagerSelect  />
          {/* Здесь вы можете добавить компонент для уведомлений, связанных с менеджером */}
        </div>
      ) : (
        <><p>Вы не менеджер и у вас нет доступа к приложению</p>
        <TextInput id='request' title='Запрос доступа' placeholder='Ваша почта example@gmail.com'/></>
      )}
    </div>
  );
}
