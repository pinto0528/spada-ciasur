"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import '../../styles/sidebar2.css';
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";

const Sidebar = () => {
  // Estado para manejar la visibilidad de la sidebar
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad de la sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h1><Link href="/home">SPADA</Link></h1>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/login">Log In</Link>
          </li>
        </ul>
      </nav>

      {/* Botón para abrir/cerrar la sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
      {isOpen ? <RiArrowLeftLine /> : <RiArrowRightLine />}
      </button>
    </div>
  );
};

export default Sidebar;