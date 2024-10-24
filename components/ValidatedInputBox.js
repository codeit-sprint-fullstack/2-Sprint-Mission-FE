export default function ValidatedInputBox({ type }) {
  const labelClass = `w-full h-[26px] text-1f2937 font-bold text-[18px] leading-26px`;
  const commonBoxClass = `w-full flex flex-col justify-between`;
  const commonInputClass = `w-full h-[56px] leading-26px rounded-[12px] px-[24px] py-[16px] overflow-hidden resize-none bg-f3f4f6`;
  const areaClass = `w-full h-[282px] leading-26px px-[24px] py-[15px] text-left rounded-[12px] resize-none bg-f3f4f6`;
  const tagListClass = `w-full h-[36px]`;
  const errorMessageClass = `w-full h-[24px] text-[14px] font-semibold flex items-center text-f74747`;

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
  const isTag = type === "tag";
  const isDescription = type === "description";
  return (
    <div className={boxClass}>
      <label className={labelClass}>{labelMessage}</label>
      <div>
        {isDescription ? (
          <textarea className={inputClass} />
        ) : (
          <input className={inputClass} />
        )}
        <p className={errorMessageClass}>asdasd</p>
        {isTag ? <div className={tagListClass}></div> : <></>}
      </div>
    </div>
  );
}
