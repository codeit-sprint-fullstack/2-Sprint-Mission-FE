import style from "../styles/LoginPage.module.css";
import Auth from "@/components/auth";

export default function LoginPage() {
  return (
    <div className={style.container}>
      <Auth />
    </div>
  );
}
