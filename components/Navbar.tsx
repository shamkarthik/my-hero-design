// import { Socials } from "@/constants";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Navigation from "./Navigation";
import { stylesClasses } from "./styleClasses";

const Navbar = () => {
  return (
    <section id="navbar" className="fixed w-full top-0 z-20 py-3 md:py-3 p-10">
      <header
        className={`w-full flex justify-between items-center ${stylesClasses.glassBackground} px-10 py-3 rounded-full`}
      >
        <Link href="/">
          {/* <Image className="w-8 m-0" src={logo} alt="Logo" /> */}
          LOGO
        </Link>
        <div className="-order-1 sm:order-none">
          <Navigation />
        </div>
        <ModeToggle />
      </header>
    </section>
  );
};

export default Navbar;
