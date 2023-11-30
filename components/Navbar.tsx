// import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";
import Container from "./Container";

const Navbar = () => {
  return (
    <Container id="navbar" classes="fixed w-full top-0 z-20 py-3 md:py-3 p-24">
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
    </Container>
  );
};

export default Navbar;
