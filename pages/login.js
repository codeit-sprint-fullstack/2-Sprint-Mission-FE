import { useState } from "react";
import { useRouter } from "next/router";
import { validation } from "../utils/validation";
import { useAuth } from "@/contexts/AuthProvider";
import style from "../styles/LoginPage.module.css";
import Auth from "@/components/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isFormValid } = validation(email, password, "", true, "");

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("입력한 정보가 유효하지 않습니다.");
      return;  
    }

    try {
      const success = await login(email, password);
      if (success) router.push("/items");
    } catch (e) {
      console.error(e.message);
      alert("요청에 실패했습니다. 다시 시도해 주세요");
    }
  };

  return (
    <div className={style.container}>
      <Auth 
        isLoginPage={true}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        isFormValid={isFormValid}
        onSubmit={handleSubmit} />
    </div>
  );
}
