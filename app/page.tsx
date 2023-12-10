import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

const Hero = () => {
  return (
    <>
      <section id="about" className="bg-yellow scroll-mt-24 snap-start">
        <HeroSection />
      </section>
      <section id="projects" className="bg-blue scroll-mt-24 snap-start">
        <ProjectsSection />
      </section>
      {/* <EmailSection /> */}
    </>
  );
};

export default Hero;
