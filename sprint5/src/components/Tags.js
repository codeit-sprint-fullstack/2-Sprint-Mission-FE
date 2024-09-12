import styles from '../css/Tags.module.css';

export default function Tags({ values = [] }) {
  return (
    <ul className={styles.tags}>
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}
