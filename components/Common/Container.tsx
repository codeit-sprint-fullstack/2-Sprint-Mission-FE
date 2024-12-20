import { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  noneStyle: boolean;
}

export default function Container({ children, noneStyle }: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${noneStyle ? styles[`none-style`] : ''}`}
    >
      {children}
    </div>
  );
}
