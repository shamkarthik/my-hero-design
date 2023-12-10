"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { stylesClasses } from "./styleClasses";

const navLinks = [
  {
    title: "About",
    path: "/#about",
  },
  {
    title: "Projects",
    path: "/#projects",
  },
  {
    title: "Contact",
    path: "contact",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-0.5  rounded-full w-6 bg-foreground transition ease transform duration-300`;
  return (
    <>
      <div className="menu hidden md:block md:w-auto" id="navbar">
        <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
          {navLinks.map((link, index) => (
            <li key={index} className="text-xl">
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden">
        <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger className="flex flex-col justify-center items-center group p-1">
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "rotate-45 translate-y-0.5 " : "mb-1.5"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "-rotate-45 -translate-y-0.5 " : "mt-1.5"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <Link key={link.title} href={link.path}>
                <DropdownMenuItem
                  className={`${stylesClasses.glassBackground}`}
                >
                  {link.title}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Navigation;
