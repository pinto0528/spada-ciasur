'use client';
import Link from 'next/link';
import buttonstyles from '../../styles/button.module.css'
import contentstyles from '../../styles/content.module.css'
import MainLayout from '../../components/layout/MainLayout';
import { FC, useEffect, useState } from 'react';
import SchedulerToggle from '../../components/schedulertoggle';
import { API_URL } from '../../utils/api';


const Settings: FC = () => {
    const [isSchedulerRunning, setIsSchedulerRunning] = useState<boolean>(false);
  

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
    <MainLayout>
    <main className={contentstyles.content}>
      <div>
       
          <h1>Configuracion</h1>

        <SchedulerToggle
        onStart={startScheduler}
        onStop={stopScheduler}
        isRunning={isSchedulerRunning}
        />
        
      </div>
    </main>
    </MainLayout>
  );
};

export default Settings;
