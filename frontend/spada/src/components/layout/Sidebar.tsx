import React from 'react';
import Link from 'next/link';
import '../../styles/sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
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
    </div>
  );
};

export default Sidebar;