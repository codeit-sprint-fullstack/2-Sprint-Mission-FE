import styles from "./Header.module.css";

export default function Header({ children }) {
  return <h1 className={styles.header}>{children}</h1>;
}
