'use client';

import React, { useState, useEffect } from 'react';
import CandidatsTable from "../ui/dashboard/Tables/CandidatsTable";
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  registerAndSubscribe,
  sendWebPush,
} from '@/app/Push';
import styles from '@/app/dashboard/page.module.css';

// Функция для получения данных кандидатов
// const fetchCandidates = async (source) => {
//   const url = source ? `/api/filtredCandidates?source=${source}` : '/api/candidates';
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch candidates');
//   }
//   const data = await response.json();
//   return data.candidates;
// };

const Dashboard = () => {
  const [siteCandidates, setSiteCandidates] = useState([]);
  const [facebookCandidates, setFacebookCandidates] = useState([]);
  const [unsupported, setUnsupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);
    if (isUnsupported) {
      return;
    }
    checkPermissionStateAndAct(setSubscription);
  }, []);

  return (
    <div>
      <div className={styles.center}>
        <button
          disabled={unsupported}
          onClick={() => registerAndSubscribe(setSubscription)}
          className='btn btn-primary'
        >
          {unsupported
            ? 'Notification Unsupported'
            : subscription
              ? 'Notification allowed'
              : 'Allow notification'}
        </button>
        {subscription && (
          <>
            <input
              placeholder={'Type push message ...'}
              className='input input-bordered mt-5'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button onClick={() => sendWebPush(message)} className='btn btn-success mt-5'>Test Web Push</button>
          </>
        )}
        <div className={styles.subscriptionLabel}>
          <span>Push subscription:</span>
        </div>
        <div className="mockup-code w-[400px]">
        <code>
          {subscription
            ? JSON.stringify(subscription.toJSON(), undefined, 2)
            : 'There is no subscription'}
        </code>
        </div>
      </div>
      <h2 className="font-bold text-lg">Кандидаты с сайта</h2>
      <CandidatsTable candidates={siteCandidates} />

      <h2 className="font-bold text-lg">Кандидаты с Facebook</h2>
      <CandidatsTable candidates={facebookCandidates} />
    </div>
  );
};

export default Dashboard;
