import React from "react";
import Container from "./Container";
import Image from "next/image";
import RedoAnimText from "./typewriter/RedoAnimText";
import AnimText from "./typewriter/AnimText";

const HeroSection = () => {
  return (
    <Container id="about" classes="bg-yellow dark:bg-black">
      <div className="flex relative px-4 items-center overflow-hidden ">
        <div className="container mx-auto flex relative py-24">
          <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative ">
            {/* <span className="w-20 h-2  dark:bg-white mb-12"></span> */}
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              <AnimText delay={2} text={"I am a"} cursorHeight="16"/>
              <span className="text-5xl sm:text-7xl">
                <RedoAnimText
                  delay={3}
                  texts={["developer", "frontend Engineer", "backend Engineer"]}
                  cursorHeight="14"
                />
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-8 dark:text-white">
              Dimension of reality that makes change possible and
              understandable. An indefinite and homogeneous environment in which
              natural events and human existence take place.
            </p>
            <div className="flex mt-8">
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
              >
                Resume
              </a>
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
              >
                Connect
              </a>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
            <Image
              src="/images/hero-image.png"
              className="max-w-xs md:max-w-sm m-auto"
              alt="hero_image"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
