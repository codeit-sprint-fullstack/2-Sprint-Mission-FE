import styles from "./LogoImage.module.css";
import pandaFace from "./image/panda_face.png";
function LogoImage() {
  return <img className={styles.logoImage} src={pandaFace} />;
}
export default LogoImage;
