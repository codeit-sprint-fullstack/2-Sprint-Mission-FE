import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "@/pages/api/AuthService";
import { validation } from "../utils/validation";
import Auth from "@/components/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { error, isFormValid } = validation(email, password, passwordConfirmation, false, nickname);

  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      // console.log('success Data: ', data);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error) => {
      console.error(error.message);
      alert("요청에 실패했습니다. 다시 시도해 주세요");
    }
  });

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("입력한 정보가 유효하지 않습니다.");
      return;
    }
    const data = { email, nickname, password, passwordConfirmation };
    // console.log('Request Data: ', data);
    mutation.mutate(data);
  };

  return (
    <div>
      <Auth 
        isLoginPage={false}
        email={email}
        setEmail={setEmail}
        nickname={nickname}
        setNickname={setNickname}
        password={password}
        setPassword={setPassword}
        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={setPasswordConfirmation}
        error={error}
        isFormValid={isFormValid}
        onSubmit={handleSubmit} />
    </div>
  );
}
