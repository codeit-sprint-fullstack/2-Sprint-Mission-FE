import ValidatedInputBox from "@/components/ValidatedInputBox";
export default function Register() {
  const registerPage = `w-full h-full flex justify-center`;
  const registerContents = `flex flex-col justify-between
    w-[1200px] h-[830px] mt-[26px] mb-[162px]
    md:w-[696px] md:h-[806px] md:mt-[18px] md:mb-[194px]
    sm:w-[344px] sm:h-[806px] sm:mt-[24px] sm:mb-[186px] `;
  const header = `w-full h-[42px] flex justify-between items-center`;
  const title = `w-[108px] h-[24px] flex items-center font-bold text-1f2937
    lg:h-[32px]`;
  const registerBtn = `w-[74px] h-[42px] rounded-[8px] px-[23px] py-[12px] text-ffffff bg-9ca3af`;

  return (
    <div className={registerPage}>
      <form className={registerContents}>
        <div className={header}>
          <h1 className={title}>상품 등록하기</h1>

          <button className={registerBtn}>등록</button>
        </div>
        <ValidatedInputBox type="name" />
        <ValidatedInputBox type="description" />
        <ValidatedInputBox type="price" />
        <ValidatedInputBox type="tag" />
      </form>
    </div>
  );
}
