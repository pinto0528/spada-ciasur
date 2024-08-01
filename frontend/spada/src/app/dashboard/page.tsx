'use client';
import { FC, useEffect, useState } from 'react';
import BackButton from '../../components/backbutton';
import contentstyles from '../../styles/content.module.css';
import { API_URL } from '../../utils/api';
import Table from '../../components/recordtable';

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  
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

  return (
    <main className={contentstyles.content}>
      <h1>Dashboard Page</h1>
      <div>
        <Table data={data} />
      </div>
      <BackButton />
    </main>
  );
};

export default DashboardPage;
