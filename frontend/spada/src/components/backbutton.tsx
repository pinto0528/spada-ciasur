'use client';
import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/button.module.css';


const BackButton: FC = () => {
  return (
    <Link href="/home" className={styles.button}>
      Back
    </Link>
  );
};

export default BackButton;