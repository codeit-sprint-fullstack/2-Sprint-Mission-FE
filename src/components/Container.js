import { useLocation } from 'react-router-dom';
import styles from './Container.module.css';

function Container({ children }) {
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  return (
    <div className={`${styles.withHeader} ${isHomepage ? '' : styles.content}`}>
      {children}
    </div>
  )

}

export default Container;