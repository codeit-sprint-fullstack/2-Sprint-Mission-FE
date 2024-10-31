import SignupForm from '@/components/Auth/SignupForm';
import styles from '@/components/Auth/Auth.module.css';

export default function SignupPage() {
  return (
    <main className={styles.container}>
      <SignupForm />
    </main>
  );
};
