import { useRouter } from 'next/router';
import styles from './Container.module.css';

export default function Container({ children }) {
  const router = useRouter();                   
  const isHomepage = router.pathname === '/';

  return (
    <>
    <div className={`${styles.withHeader} ${isHomepage ? '' : styles.content}`}>
      {children}
    </div>
    </>
  )
}