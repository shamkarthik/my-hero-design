import React from "react";

const NavTypeVer1 = () => {
  return (
    <header className="h-24 sm:h-32 flex items-center  w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
          Watch.ME
        </div>
        <div className="flex items-center">
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            <a href="#" className="py-2 px-6 flex">
              Home
            </a>
            <a href="#" className="py-2 px-6 flex">
              Watch
            </a>
            <a href="#" className="py-2 px-6 flex">
              Product
            </a>
            <a href="#" className="py-2 px-6 flex">
              Contact
            </a>
            <a href="#" className="py-2 px-6 flex">
              Carrer
            </a>
          </nav>
          <button className="lg:hidden flex flex-col ml-4">
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavTypeVer1;
