import Image from "next/image";
import { FIELD_TYPES } from "@/constants";
import { tenaryWithEmpty } from "@/utils/ternaryUtils";
export default function ValidatedInputBox({
  type,
  onChange,
  onKeyDown,
  value,
  message,
  tagList,
  onClick,
  isShowPassword
}) {
  const { NAME, DESCRIPTION, PRICE, TAG, EMAIL, PASSWORD } = FIELD_TYPES;
  const convertClass = (type) => {
    switch (type) {
      case NAME:
        return {
          labelMessage: "상품명",
          placeholderMessage: "상품명을 입력해주세요"
        };
      case DESCRIPTION:
        return {
          labelMessage: "상품 소개",
          placeholderMessage: "상품 소개를 입력해주세요"
        };
      case PRICE:
        return {
          labelMessage: "판매가격",
          placeholderMessage: "판매가격을 입력해주세요"
        };
      case TAG:
        return {
          labelMessage: "태그",
          placeholderMessage: "태그를 입력해주세요"
        };
      case EMAIL:
        return {
          labelMessage: "이메일",
          placeholderMessage: "이메일을 입력해주세요"
        };
      case PASSWORD:
        return {
          labelMessage: "비밀번호",
          placeholderMessage: "비밀번호를 입력해주세요"
        };
      default:
        return {
          labelMessage: "",
          placeholderMessage: ""
        };
    }
  };
  const { labelMessage, placeholderMessage } = convertClass(type);
  const isTag = type === TAG;
  const isDescription = type === DESCRIPTION;
  const isPassword = type === PASSWORD;
  const pwToggleOtherText = isPassword
    ? isShowPassword
      ? "text"
      : "password"
    : "text";
  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor={type}
        className="w-full h-[26px] text-1f2937 font-bold text-[18px] leading-26px mb-[16px]"
      >
        {labelMessage}
      </label>
      {isDescription ? (
        <textarea
          className="w-full h-[282px] leading-26px px-[24px] py-[15px] text-left rounded-[12px] resize-none bg-f3f4f6 focus:outline-none"
          id={type}
          onChange={onChange}
          value={value}
          placeholder={placeholderMessage}
        />
      ) : (
        <div className="relative">
          <input
            className="w-full h-[56px] leading-26px rounded-[12px] px-[24px] py-[16px] overflow-hidden resize-none bg-f3f4f6 focus:outline-none"
            id={type}
            type={pwToggleOtherText}
            onChange={onChange}
            onKeyDown={isTag ? onKeyDown : undefined}
            value={value}
            placeholder={placeholderMessage}
            autoComplete="off"
          />
          {tenaryWithEmpty(
            isPassword,
            <button
              onClick={onClick}
              className="w-[24px] h-[24px] absolute top-1/2 right-[24px] transform -translate-y-1/2"
            >
              <Image
                width={24}
                height={24}
                src={
                  isShowPassword
                    ? "/images/btn_visibility_on.png"
                    : "/images/btn_visibility_off.png"
                }
                alt="비밀번호 토글 이미지"
              />
            </button>
          )}
        </div>
      )}
      {tenaryWithEmpty(
        !!message,
        <p className="w-full h-[24px] text-[14px] font-semibold flex items-center ml-[16px] text-f74747">
          {message}
        </p>
      )}
      {tenaryWithEmpty(
        isTag,
        <div className="w-full h-[36px] flex flex-cols mt-[14px]">
          {tagList?.map((tag) => (
            <div
              className="h-full pl-[16px] pr-[12px] py-[5px] mr-[16px] flex justify-between items-center rounded-26px text-1f2937 bg-f3f4f6"
              key={tag}
            >
              <span className="text-[16px] mr-[8px] text-1f2937">#{tag}</span>
              <button
                className="w-[22px] h-[24px] flex justify-center items-center"
                type="button"
                onClick={() => onClick(tag)}
              >
                <Image
                  width={24}
                  height={22}
                  src="/images/ic_X.png"
                  alt="X이미지"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
