// components/Sidebar.tsx
import React from 'react';
import styles from '../../styles/sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <h1>SPADA</h1>
      <div className={styles.navItems}>
        <a href="/home">Inicio</a>
        <a href="/dashboard">Tablero</a>
        <a href="/login">Iniciar Sesion</a>
        <a href="/settings">Configuracion</a>
      </div>
      <div className={styles.footer}>
        <p>CIASUR</p>
        <p>Facultad Regional Tucuman</p>
        <p>Universidad Tecnologica Nacional</p>
      </div>
    </div>
  );
};

export default Sidebar;
