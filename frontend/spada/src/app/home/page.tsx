'use client';
import { FC } from 'react';
import Link from 'next/link';
import buttonstyles from '../../styles/button.module.css'
import contentstyles from '../../styles/content.module.css'


const Home: FC = () => {
  return (
    <main className={contentstyles.content}>
      <div>
        <h1>SPADA</h1>
        <h3>CIASUR - FRT</h3>
        <div>
          <Link href="/login" className={buttonstyles.button}>
            Login
          </Link>

          <Link href="/dashboard" className={buttonstyles.button}>
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
