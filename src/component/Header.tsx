import Image from "next/image";
import NavLink from "./Navlink";
import Marquee from "./Marquee";
import Link from "next/link";
import Userinfo from "./userinfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full max-w-7xl mx-auto px-8 md:px-12 py-4">
      <div className="flex items-center justify-between">

        <div className="hidden md:block w-[120px]"></div>


        <div className="flex items-center gap-3">

          <Image
            className="w-11 h-11 object-contain rounded-2xl"
            height={44}
            width={44}
            src="/logo.webp"
            alt="Bangla News 24 Logo"
          />

          {/* Title and Date */}
          <div className="flex flex-col text-left">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#b91c1c] leading-tight">
              Bangla News 24
            </h1>
            <p className="text-[11px] text-gray-500 font-normal -mt-0.5">
              {date}
            </p>
          </div>
        </div>

        {/* Right Side Buttons: Exactly inline with logo/title */}
        <Userinfo/>
        
      </div>
      <NavLink />

    </header>
  );
};

export default Header;