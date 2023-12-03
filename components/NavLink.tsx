import Link from "next/link";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4  sm:text-xl rounded md:p-0 "
    >
      {title}
    </Link>
  );
};

export default NavLink;
