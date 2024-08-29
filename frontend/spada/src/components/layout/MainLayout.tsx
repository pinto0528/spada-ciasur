import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/global.css'
import contentstyles from '../../styles/content.module.css'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className={contentstyles.content}>
    <div style={{ display: 'flex', minHeight: 'auto' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <main>
          {children}
        </main>
      </div>
    </div>
    </main>
  );
};

export default MainLayout;