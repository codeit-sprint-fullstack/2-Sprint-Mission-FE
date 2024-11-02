import Nav from "@/components/Nav";
import Section from "@/components/Section";
import { SECTIONS } from "@/constants";
export default function Home() {
  const margin = "mt-[138px] md:mt-[52px] sm:mt-[83px]";
  const { WATCH, CHECK, SEARCH, REGISTER, SAFETY } = SECTIONS;
  return (
    <>
      <Section name={WATCH} />
      <Section name={CHECK} />
      <Section name={SEARCH} />
      <Section name={REGISTER} />
      <Section name={SAFETY} className={margin} />
    </>
  );
}
