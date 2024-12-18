import Image from "next/image";
import facebook from "@/../public/assets/ic_facebook.svg";
import instagram from "@/../public/assets/ic_instagram.svg";
import twitter from "@/../public/assets/ic_twitter.svg";
import youtube from "@/../public/assets/ic_youtube.svg";

export default function Footer() {
  return (
    <div className="w-full h-[16rem] py-[3.2rem] px-[20rem] gap-[1rem] bg-[#111827] flex justify-center">
      <div className="w-full flex justify-between items-start">
        <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center text-[#9CA3AF]">
          @codeit - 2024
        </p>
        <div className="flex gap-[3rem]">
          <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center text-[#E5E7EB]">
            Privacy Policy
          </p>
          <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center text-[#E5E7EB]">
            FAQ
          </p>
        </div>
        <div className="flex gap-[1.2rem]">
          <Image src={facebook} alt="facebook" />
          <Image src={twitter} alt="twitter" />
          <Image src={youtube} alt="youtube" />
          <Image src={instagram} alt="instagram" />
        </div>
      </div>
    </div>
  );
}
