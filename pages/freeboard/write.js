export default function Write() {
  const writePage = `w-full flex justify-center`;
  const writeFrame = `w-[1200px] h-[512px] mt-[24px] mb-[794px] bg-green-500
    md:w-[696px] md:mt-[16px] md:mb-[879px]
    sm:w-[345px] sm:h-[410px] sm:mt-[16px] sm:mb-[965px]`;
  const header = `w-full h-[42px] bg-blue-500`;
  return (
    <div className={writePage}>
      <div className={writeFrame}>
        <div className={header}></div>
      </div>
    </div>
  );
}
