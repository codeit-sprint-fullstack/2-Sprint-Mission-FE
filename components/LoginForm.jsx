import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/auth";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const mutation = useMutation(signIn, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/market");
    },
    onError: () => {
      setError({
        email: "이메일을 확인해 주세요.",
        password: "비밀번호를 확인해 주세요.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <p>{error.email}</p>}
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
            {isPasswordVisible ? "😑" : "😃"}
          </button>
          {error.password && <p>{error.password}</p>}
        </div>
        <button type="submit" disabled={!email || !password}>
          로그인
        </button>
        <p onClick={() => router.push("/signup")}>회원 가입하기</p>
      </form>
    </div>
  );
}
