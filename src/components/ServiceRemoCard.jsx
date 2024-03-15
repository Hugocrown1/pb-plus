import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServiceRemoCard = ({ children, href, title, image, style }) => {
  return (
    <article
      className={`group hover:bg-[#a1a1a13d] rounded-xl ${style} h-full xl:py-0 py-2 overflow-hidden text-center hover:bg-[#941B0C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
    >
      <Link href={href}>
        <div className="relative flex w-full h-full items-center justify-center px-6 py-2 text-xl xl:text-2xl">
          <div className="flex flex-col gap-2 w-full z-10 items-center justify-center">
            <div className="relative w-full aspect-square bg-gray-100 group-hover:bg-white rounded-lg overflow-hidden">
              <Image
                src={image}
                alt="remo photo"
                fill={true}
                sizes="(min-width: 1120px) 800px"
                className="object-cover object-center"
              />
            </div>
            <p className="font-semibold min-h-[64px]">{title}</p>
            <p className="text-base font-light text-[#5e5e5e] ">{children}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ServiceRemoCard;
