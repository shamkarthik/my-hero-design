// import { Socials } from "@/constants";
import Link from "next/link";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <section id="navbar" className="fixed w-full top-0 z-20 py-3 md:py-3 p-10">
      <header
        className={
          "w-full flex justify-between items-center bg-purple  dark:bg-[#4035452f] backdrop-blur-md px-10 py-3 rounded-full  drop-shadow-solid"
        }
      >
        <Link href="/">
          {/* <Image className="w-8 m-0" src={logo} alt="Logo" /> */}
          LOGO
        </Link>
        <Navigation />
      </header>
    </section>
  );
};

export default Navbar;
