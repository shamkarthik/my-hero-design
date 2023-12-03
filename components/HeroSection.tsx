import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimText from "./typewriter/AnimText";
import RedoAnimText from "./typewriter/RedoAnimText";

const HeroSection = () => {
  return (
    <section id="about" className="bg-yellow dark:bg-black">
      <div className="flex relative items-center overflow-hidden ">
        <div className=" w-screen mx-auto flex relative">
          <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative my-auto">
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-7xl font-black flex flex-col leading-none dark:text-white text-gray-800 h-52">
              <AnimText delay={2} text={"I am a"} cursorHeight="14" />
              {/* <span className="text-5xl sm:text-7xl"> */}
              <RedoAnimText
                delay={3}
                texts={["developer", "frontend Engineer", "backend Engineer"]}
                cursorHeight="14"
              />
              {/* </span> */}
            </h1>

            <span className="flex flex-col text-sm sm:text-base mt-16 text-gray-700 dark:text-white w-full">
              <AnimText
                delay={2}
                text={`Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.`}
                cursorHeight="8"
              />
            </span>
            <div className="flex mt-8 gap-6">
              <Button variant="ghost">Resume</Button>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-3/5">
            <Image
              src="/images/hero-image2.svg"
              className=" m-auto object-contain"
              alt="hero_image"
              height={500}
              width={500}
              loading="eager"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;