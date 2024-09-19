import styles from "./LoginOrProfile.module.css";
function LoginOrProfile({ className }) {
  return (
    <button className={`${styles.loginOrProfile} ${className}`}>로그인</button>
  );
}
export default LoginOrProfile;
