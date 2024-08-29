import React from 'react';
import styles from '../../styles/header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <input type="text" placeholder="Search..." />
        <button>Buscar</button>
      </div>
    </header>
  );
};

export default Header;
