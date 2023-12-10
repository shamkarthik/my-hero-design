"use client";
import { motion, useInView } from "framer-motion";
import { Linkedin, LucideGithub, Mail } from "lucide-react";
import Image from "next/image";
import { ReactElement, useRef } from "react";
import ContactCard from "./ContactCard";
import AnimText from "./typewriter/AnimText";

type ContactDetailType = {
  name: string;
  iconElement?: ReactElement;
  redirectLink?: string;
  icon?: string;
};
const contactDetails: ContactDetailType[] = [
  {
    name: "LinkedIn",
    // icon: LinkedinIcon,
    iconElement: <Linkedin />,
    redirectLink: "https://www.linkedin.com/",
  },
  {
    name: "Mail",
    iconElement: <Mail />,
  },
  {
    name: "Github",
    // icon: GithubIcon,
    iconElement: <LucideGithub />,
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  console.log(isInView);
  return (
    <div className="grid grid-flow-col grid-cols-2 items-center">
      <div className="flex flex-col gap-5 col-span-1">
        <h1 className="font-beast uppercase text-3xl sm:text-5xl font-black flex flex-col leading-none h-20 text-center">
          <AnimText
            delay={0}
            text={"Want to connect with me"}
            cursorHeight="5"
          />
        </h1>
        <div className="grid grid-flow-row gap-4 justify-center justify-items-start mt-4">
          {contactDetails.map((contact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: 2 + index * 0.4 }}
            >
              <ContactCard
                key={index}
                name={contact.name}
                iconPath={contact?.icon}
                iconElement={contact?.iconElement}
                redirectLink={contact.redirectLink}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="md:col-span-1  ">
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
  );
};

export default ContactSection;
