import React from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import styles from '@/components/Auth/Auth.module.css';

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  );
};
