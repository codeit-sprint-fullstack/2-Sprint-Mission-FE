import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/market");
    },
    onError: () => {
      alert("회원가입에 실패했습니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않아요.");
      return;
    }
    setPasswordError("");
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "🙈" : "👁️"}
          </button>
        </div>
        <div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && <p>{passwordError}</p>}
        </div>
        <button
          type="submit"
          disabled={!email || !password || !confirmPassword}
        >
          회원가입
        </button>
        <p onClick={() => router.push("/signin")}>로그인으로 돌아가기</p>
      </form>
    </div>
  );
}
