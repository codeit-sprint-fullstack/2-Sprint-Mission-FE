import styles from './Container.module.css';

export default function Container({ children }) {
  //const router = useRouter();                     // 향후, index 화면 추가시 사용 예정
  //const isHomepage = router.pathname === '/';

  return (
    <>
    {/* <div className={`${styles.withHeader} ${isHomepage ? styles.content : styles.content}`}> */}
    <div className={`${styles.withHeader} ${styles.content}`}>
      {children}
    </div>
    </>
  )
}