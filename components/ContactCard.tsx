import Image from "next/image";
import Link from "next/link";
import { ReactElement, cloneElement } from "react";

type ContactCardProps = {
  iconPath?: string;
  iconElement?: ReactElement;
  name: string;
  redirectLink?: string;
};

const ContactCard = ({
  iconPath,
  name,
  redirectLink,
  iconElement,
}: ContactCardProps) => {
  return (
    <Link
      href={redirectLink || ""}
      rel="noopener noreferrer"
      target={redirectLink ? "_blank" : ""}
    >
      <div className="flex items-center cursor-pointer">
        <div className="shrink-0">
          <div className="inline-block rounded-md px-4">
            {iconPath ? (
              <Image
                src={iconPath}
                // className="m-auto object-contain"
                alt="hero_image"
                height={48}
                width={48}
                loading="eager"
                priority={true}
              />
            ) : (
              <>
                {iconElement &&
                  cloneElement(iconElement, {
                    className: "w-12 h-12 p-1",
                  })}
              </>
            )}
          </div>
        </div>
        <p className="mb-2 font-bold ">{name}</p>
      </div>
    </Link>
  );
};

export default ContactCard;
