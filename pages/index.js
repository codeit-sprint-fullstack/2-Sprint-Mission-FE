import Nav from "@/components/Nav";
import Section from "@/components/Section";
export default function Home() {
  const margin = "mt-[138px] md:mt-[52px] sm:mt-[83px]";
  return (
    <>
      <Section name="watch" />
      <Section name="check" />
      <Section name="search" />
      <Section name="register" />
      <Section name="safety" className={margin} />
    </>
  );
}
