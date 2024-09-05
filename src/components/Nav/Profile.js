import profileImg from "./img/profile-image.png";
import "./style/Profile.css";
function Profile() {
  // return <div>asdasd</div>;
  return (
    <div id="profile">
      <img id="profile-image" src={profileImg} alt="프로필이미지" />
      <div id="profile-nickname">김코드</div>
      {/* 로그인정보 받아서 닉네임 */}
    </div>
  );
}
export default Profile;
