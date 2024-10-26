import Image from "next/image";
export default function ValidatedInputBox({
  type,
  onChange,
  onKeyDown,
  value,
  message,
  tagList,
  onClick
}) {
  const labelClass = `w-full h-[26px] text-1f2937 font-bold text-[18px] leading-26px`;
  const commonBoxClass = `w-full flex flex-col justify-between`;
  const commonInputClass = `w-full h-[56px] leading-26px rounded-[12px] px-[24px] py-[16px] overflow-hidden resize-none bg-f3f4f6`;
  const areaClass = `w-full h-[282px] leading-26px px-[24px] py-[15px] text-left rounded-[12px] resize-none bg-f3f4f6`;
  const tagListClass = `w-full h-[36px] flex flex-cols`;
  const tagClass = `h-full pl-[16px] pr-[12px] py-[5px] mr-[16px] flex justify-between items-center rounded-26px text-1f2937 bg-f3f4f6`;
  const errorMessageClass = `w-full h-[24px] text-[14px] font-semibold flex items-center ml-[16px] text-f74747`;
  const tagName = `text-[16px] mr-[8px] text-1f2937`;
  const deleteTagBtn = `w-[22px] h-[24px] flex justify-center items-center`;

  const convertClass = (type) => {
    switch (type) {
      case "name":
        return {
          labelMessage: "상품명",
          boxClass: `${commonBoxClass} h-[108px]`,
          inputClass: commonInputClass
        };
      case "description":
        return {
          labelMessage: "상품 소개",
          boxClass: `${commonBoxClass} h-[334px]`,
          inputClass: areaClass
        };
      case "price":
        return {
          labelMessage: "판매가격",
          boxClass: `${commonBoxClass} h-[108px]`,
          inputClass: commonInputClass
        };
      case "tag":
        return {
          labelMessage: "태그",
          boxClass: `${commonBoxClass} h-[158px]`,
          inputClass: commonInputClass
        };
      default:
        return {
          labelMessage: "",
          boxClass: "",
          inputClass: ""
        };
    }
  };
  const { labelMessage, boxClass, inputClass } = convertClass(type);
  const istag = type === "tag";
  const isDescription = type === "description";
  return (
    <div className={boxClass}>
      <label htmlFor={type} className={labelClass}>
        {labelMessage}
      </label>
      <div>
        {isDescription ? (
          <textarea
            id={type}
            onChange={onChange}
            className={inputClass}
            value={value}
          />
        ) : (
          <input
            id={type}
            onChange={onChange}
            onKeyDown={istag ? onKeyDown : undefined}
            value={value}
            className={inputClass}
          />
        )}
        <p className={errorMessageClass}>{message}</p>
        {istag ? (
          <div className={tagListClass}>
            {tagList?.map((tag, index) => (
              <div className={tagClass} key={tag}>
                <span className={tagName}>#{tag}</span>
                <button
                  className={deleteTagBtn}
                  type="button"
                  onClick={() => onClick(index)}
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
