import { useState } from "react";
import Link from "next/link";
import ValidatedInputBox from "@/components/ValidatedInputBox";
import Image from "next/image";
import { FIELD_TYPES, VALIDATION_STATE } from "@/constants";
import { changeInputValue, validateField } from "@/utils/validateInputHelper";
import { postUser } from "@/api/api";
import { useRouter } from "next/router";
import { useError } from "@/contexts/ErrorProvider";
export default function Signup() {
  const { EMAIL, NICKNAME, PASSWORD, CONFIRMPASSWORD } = FIELD_TYPES;
  const { INITIAL, SUCCESS, FALSE } = VALIDATION_STATE;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: ""
  });
  const [validation, setValidation] = useState({
    email: INITIAL,
    nickname: INITIAL,
    password: INITIAL,
    confirmPassword: INITIAL
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();
  const ValidateBtn = () => {
    const result = Object.entries(validation).every(
      ([key, value]) => value === SUCCESS
    );
    return result;
  };
  const { handleError } = useError();
  const handleChangeShowPassword = () => setShowPassword((prev) => !prev);
  const handleChangeShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleChangeInputValue = (fieldName) => (e) => {
    const value = e.target.value;
    changeInputValue(setInputValue, fieldName, value);
    validateField(setValidation, setErrorMessage, fieldName, value, inputValue);
  };
  const handleSubmit = async () => {
    const {
      email,
      nickname,
      password,
      confirmPassword: passwordConfirmation
    } = inputValue;
    const submitData = {
      email,
      nickname,
      password,
      passwordConfirmation
    };
    let response;
    try {
      response = await postUser(submitData);
      router.push("/items");
    } catch (e) {
      handleError("회원가입 실패");
    }
  };
  const isSubmit = ValidateBtn();
  const isShowPassword = showPassword === true;
  const isShowConfirmPassword = showConfirmPassword === true;
  return (
    <div className="flex justify-center w-full h-full">
      <div
        className="w-[640px] h-[618px] mt-[231px] mb-[284px]
      md:mt-[190px] md:mb-[325px]
      sm:w-[343px] sm:h-[501px] sm:mt-[81px] sm:mb-[231px]
      flex flex-col items-center"
      >
        <Link
          href="/"
          className="flex items-center justify-between w-[396px] h-[132px] sm:w-[198px] sm:h-[66px]"
        >
          <div className="relative w-[103.53px] h-[103.88px] sm:w-[51.76px] sm:h-[51.94px]">
            <Image
              src="/images/big_logo.png"
              alt="로고이미지"
              className="object-contain"
              layout="fill" // 부모 요소의 크기에 맞게 채우기
              objectFit="cover" // 부모 요소를 완전히 채우도록 조정
              sizes="100vw"
            />
          </div>
          <span
            className="w-[266px] h-[90px] sm:w-[133px] sm:h-[45px]
          font-bold text-[66.34px] leading-89.56px text-3692ff
          sm:text-[33.17px] sm:leading-44.78px"
          >
            판다마켓
          </span>
        </Link>
        <div className="w-full flex flex-col items-center gap-[24px] mt-[40px] sm:mt-[24px]">
          <ValidatedInputBox
            type={EMAIL}
            value={inputValue.email}
            onChange={handleChangeInputValue(EMAIL)}
            message={errorMessage.email}
          />
          <ValidatedInputBox
            type={NICKNAME}
            value={inputValue.nickname}
            onChange={handleChangeInputValue(NICKNAME)}
            message={errorMessage.nickname}
          />
          <ValidatedInputBox
            type={PASSWORD}
            value={inputValue.password}
            isShowPassword={isShowPassword}
            onClick={handleChangeShowPassword}
            onChange={handleChangeInputValue(PASSWORD)}
            message={errorMessage.password}
          />
          <ValidatedInputBox
            type={CONFIRMPASSWORD}
            value={inputValue.confirmPassword}
            isShowPassword={isShowConfirmPassword}
            onClick={handleChangeShowConfirmPassword}
            onChange={handleChangeInputValue(CONFIRMPASSWORD)}
            message={errorMessage.confirmPassword}
          />
          <button
            className={`w-full h-[56px] rounded-[40px] text-[16px] text-f3f4f6 ${
              isSubmit ? "bg-3692ff" : "bg-9ca3af"
            }`}
            onClick={handleSubmit}
            disabled={!isSubmit}
          >
            회원가입
          </button>
          <div className="w-full h-[74px] flex justify-between items-center bg-e6f2ff">
            <span className="ml-[23px]">간편 로그인하기</span>
            <div className="w-[100px] h-[42px] mr-[23px] flex justify-between">
              <Link href="https://www.google.com" target="_blank">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_google.png"
                  alt="구글아이콘"
                />
              </Link>
              <Link href="https://www.kakao.com" target="_blank">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_kakao.png"
                  alt="카카오아이콘"
                />
              </Link>
            </div>
          </div>
          <div className="flex h-[24px] gap-[4px]">
            <span className="h-full text-[14px]">판다마켓이 처음이신가요?</span>
            <Link
              href="/signup"
              className="h-full text-[14px] text-3692ff underline"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
