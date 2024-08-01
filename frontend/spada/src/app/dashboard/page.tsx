'use client';
import { FC, useEffect, useState } from 'react';
import BackButton from '../../components/backbutton';
import SchedulerToggle from '../../components/schedulertoggle';
import Table from '../../components/recordtable';

import contentstyles from '../../styles/content.module.css';
import { API_URL } from '../../utils/api';




const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isSchedulerRunning, setIsSchedulerRunning] = useState<boolean>(false);
  
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching data...');
      try {
        console.log(`${API_URL}/records`);
        const response = await fetch(`${API_URL}/records`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result); // Verifica aquí los datos
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const startScheduler = async () => {
    try {
      const response = await fetch(`${API_URL}/scheduler/start`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Scheduler started:', result);
      setIsSchedulerRunning(true);
    } catch (error) {
      console.error('Error starting scheduler:', error);
    }
  };

  const stopScheduler = async () => {
    try {
      const response = await fetch(`${API_URL}/scheduler/stop`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Scheduler stopped:', result);
      setIsSchedulerRunning(false);
    } catch (error) {
      console.error('Error stopping scheduler:', error);
    }
  };

  return (
    <main className={contentstyles.content}>
      <h1>Dashboard Page</h1>
      <div>
        <Table data={data} />
      </div>
      <SchedulerToggle
        onStart={startScheduler}
        onStop={stopScheduler}
        isRunning={isSchedulerRunning}
      />
      <BackButton />
    </main>
  );
};

export default DashboardPage;
