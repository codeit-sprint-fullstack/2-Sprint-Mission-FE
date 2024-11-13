import Image from "next/image";
import pandaLogo from "../../../public/panda-logo.svg";
import google from "../../../public/ic_google.svg";
import kakao from "../../../public/ic_kakao.svg";
import eyeOn from "../../../public/btn_visibility_on.png";
import eyeOff from "../../../public/btn_visibility_off.png";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postSignUp, SignUpData } from "@/api/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormProps {
  email: string;
  nickname: string;
  pw: string;
  pwcheck: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
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
    getValues,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      pw: "",
      pwcheck: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);
      router.push("/items");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "회원가입 실패";
      setErrorMessage(message);
      setIsModalOpen(true);
    },
  });

  console.log(errorMessage);

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
    mutation.mutate({
      email: data.email,
      nickname: data.nickname,
      password: data.pw,
      passwordConfirmation: data.pwcheck,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordCheckVisibility = () => {
    setShowPasswordCheck(!showPasswordCheck);
  };

  return (
    <div className={styles.signup}>
      <Image className={styles.panda_image} src={pandaLogo} alt="판다마켓" />
      <div className={styles.signup_bottom}>
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
              <p className={styles.text}>닉네임</p>
              <input
                className={styles.nick_input}
                placeholder="닉네임을 입력해주세요"
                {...register("nickname", {
                  required: "닉네임 입력은 필수입니다.",
                  onChange: () => {
                    trigger("nickname");
                  },
                })}
              />
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
                      trigger("pwcheck");
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
            <div className={styles.wrapper}>
              <p className={styles.text}>비밀번호 확인</p>
              <div
                className={styles.eye_wrapper}
                style={{ border: errors.pwcheck ? "1px solid #f74747" : "" }}
              >
                <input
                  className={styles.pw_input}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  type={showPasswordCheck ? "text" : "password"}
                  {...register("pwcheck", {
                    required: "비밀번호가 일치하지 않습니다.",
                    validate: (value) => {
                      const { pw } = getValues();
                      return pw === value || "비밀번호가 일치하지 않습니다.";
                    },
                    onChange: () => {
                      trigger("pwcheck");
                    },
                  })}
                />
                <Image
                  src={showPasswordCheck ? eyeOff : eyeOn}
                  alt="눈"
                  onClick={togglePasswordCheckVisibility}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {errors.pwcheck && (
                <p className={styles.error}>{errors.pwcheck.message}</p>
              )}
            </div>
          </div>
          <button
            className={`${styles.signup_button} ${
              isValid ? styles.button_active : ""
            }`}
            disabled={!isValid}
          >
            회원가입
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
          <p className={styles.first_text}>이미 회원이신가요?</p>
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
