import Image from "next/image";
import AnimText from "./typewriter/AnimText";
import RedoAnimText from "./typewriter/RedoAnimText";

const HeroSection = () => {
  return (
    <section id="about" className="bg-yellow dark:bg-black">
      <div className="flex relative min-w-full items-center overflow-hidden ">
        <div className="container mx-auto flex relative py-24">
          <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative my-auto">
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-7xl font-black flex flex-col leading-none dark:text-white text-gray-800 h-52">
              <AnimText delay={2} text={"I am a"} cursorHeight="16" />
              <span className="text-5xl sm:text-7xl">
                <RedoAnimText
                  delay={3}
                  texts={["developer", "frontend Engineer", "backend Engineer"]}
                  cursorHeight="14"
                />
              </span>
            </h1>

            <span className="flex flex-col text-sm sm:text-base mt-8 text-gray-700 dark:text-white w-full">
              <AnimText
                delay={2}
                text={`Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.`}
                cursorHeight="16"
              />
            </span>
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
