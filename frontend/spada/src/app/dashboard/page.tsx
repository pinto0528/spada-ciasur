'use client';

import MainLayout from '../../components/layout/MainLayout';
import DynamicChart from '../../components/dinchart';
import contentstyles from '../../styles/content.module.css';
import { API_URL } from '../../utils/api';
import React, { useState } from 'react';
import DashboardTab from '../../components/dashboardtab';



const DashboardPage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<any>(null);

  const openModal = (title: string, endpoint: string, interval?: string, dataType?: string) => {
    setModalProps({ title, endpoint, interval, dataType });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
    <main className={contentstyles.content}>
      <h1>Tablero</h1>
      <div>
        <DashboardTab/>
      </div> 
      
    </main>
    </MainLayout>
  );
};

export default DashboardPage;
