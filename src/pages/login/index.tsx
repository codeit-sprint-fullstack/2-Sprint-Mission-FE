import Image from "next/image";
import Link from "next/link";
import pandaLogo from "../../../public/panda-logo.svg";
import google from "../../../public/ic_google.svg";
import kakao from "../../../public/ic_kakao.svg";
import eye from "../../../public/btn_visibility_on.png";
import styles from "../../styles/Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps {
  email: string;
  pw: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                  type="password"
                  {...register("pw", {
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다.",
                    },
                    onChange: () => {
                      trigger("pw");
                    },
                  })}
                />
                <Image src={eye} alt="눈" />
              </div>
              {errors.pw && <p className={styles.error}>{errors.pw.message}</p>}
            </div>
          </div>
          <button className={styles.login_button} type="submit">
            로그인
          </button>
        </form>
        <div className={styles.simple_login}>
          <p className={styles.simple_login_text}>간편 로그인하기</p>
          <div className={styles.icons}>
            <Image src={google} alt="구글" />
            <Image src={kakao} alt="카카오" />
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
