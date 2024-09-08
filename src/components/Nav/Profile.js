import profileImg from "./img/profile-image.png";
import styles from "./Profile.module.css";
function Profile({ className }) {
  return (
    <div className={`${className} ${styles.isLoggedIn}`}>
      <div className={styles.loginProfile}>
        <img className={styles.image} src={profileImg} alt="프로필이미지" />
        <div className={styles.nickname}>김코드</div>
        {/* 로그인정보 받아서 닉네임 */}
      </div>
      <button className={styles.loginButton}>로그인</button>
    </div>
  );
}
export default Profile;
