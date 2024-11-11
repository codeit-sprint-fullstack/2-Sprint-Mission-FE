import Image from "next/image";
import Link from "next/link";
import pandaLogo from "../../../public/panda-logo.svg";
import google from "../../../public/ic_google.svg";
import kakao from "../../../public/ic_kakao.svg";
import eyeOn from "../../../public/btn_visibility_on.png";
import eyeOff from "../../../public/btn_visibility_off.png";
import styles from "../../styles/Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postLogIn } from "@/api/axios";

interface FormProps {
  email: string;
  pw: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/items");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      email: "",
      pw: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postLogIn,
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);
      router.push("/items");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "로그인 실패";
      setErrorMessage(message);
      setIsModalOpen(true);
    },
  });

  console.log(errorMessage);

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
    mutation.mutate({
      email: data.email,
      password: data.pw,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <Image className={styles.panda_image} src={pandaLogo} alt="판다마켓" />
      <div className={styles.login_bottom}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_wrapper}>
            <div className={styles.wrapper}>
              <p className={styles.text}>이메일</p>
              <input
                className={styles.email_input}
                style={{ border: errors.email ? "1px solid #f74747" : "" }}
                placeholder="이메일을 입력해주세요"
                {...register("email", {
                  required: "이메일 입력은 필수입니다.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "잘못된 이메일입니다.",
                  },
                  onChange: () => {
                    trigger("email");
                  },
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.wrapper}>
              <p className={styles.text}>비밀번호</p>
              <div
                className={styles.eye_wrapper}
                style={{ border: errors.pw ? "1px solid #f74747" : "" }}
              >
                <input
                  className={styles.pw_input}
                  placeholder="비밀번호를 입력해주세요"
                  type={showPassword ? "text" : "password"}
                  {...register("pw", {
                    required: "비밀번호 입력은 필수입니다.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다.",
                    },
                    onChange: () => {
                      trigger("pw");
                    },
                  })}
                />
                <Image
                  src={showPassword ? eyeOff : eyeOn}
                  alt="눈"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {errors.pw && <p className={styles.error}>{errors.pw.message}</p>}
            </div>
          </div>
          <button
            className={`${styles.login_button} ${
              isValid ? styles.button_active : ""
            }`}
            type="submit"
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
        <div className={styles.simple_login}>
          <p className={styles.simple_login_text}>간편 로그인하기</p>
          <div className={styles.icons}>
            <Link href="https://www.google.com/">
              <Image src={google} alt="구글" />
            </Link>
            <Link href="https://www.kakaocorp.com/page">
              <Image src={kakao} alt="카카오" />
            </Link>
          </div>
        </div>
        <div className={styles.first}>
          <p className={styles.first_text}>판다마켓이 처음이신가요?</p>
          <Link href="/signup" className={styles.signup}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
