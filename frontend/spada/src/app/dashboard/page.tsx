'use client';

import MainLayout from '../../components/layout/MainLayout';
import DynamicChart from '../../components/dinchart';
import contentstyles from '../../styles/content.module.css';
import { API_URL } from '../../utils/api';
import React, { useState } from 'react';


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
        <div>
          <button onClick={() => openModal("Datos Individuales", `${API_URL}/data`, undefined, "raw")}>
            Ver Datos Individuales
          </button>
          <button onClick={() => openModal("Promedios por Hora", `${API_URL}/data`, "hour", "average")}>
            Ver Promedios por Hora
          </button>
          <button onClick={() => openModal("Promedios Diarios", `${API_URL}/data`, "day", "average")}>
            Ver Promedios Diarios
          </button>
        </div>
      
    </main>
    </MainLayout>
  );
};

export default DashboardPage;
