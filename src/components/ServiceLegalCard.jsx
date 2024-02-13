"use client";
import React, { useState } from "react";
import Link from "next/link";

const ServiceCard = ({ children, href, title, style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`group bg-[#FCFFFC] ${style} overflow-hidden text-center hover:bg-[#cba557] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>
        <div className="relative flex w-full h-full items-center justify-start text-2xl">
          <div className="flex flex-col z-10 px-4 items-start justify-center">
            <p className="font-semibold group-hover:text-white py-4 text-gray-800">
              {title}
            </p>
            <p className="text-base text-start font-light text-[#5e5e5e]  group-hover:text-white">
              {children}
            </p>
          </div>
          {isHovered && (
            <div className="absolute inset-y-0 inset-x-0 flex items-end justify-end pr-4 pb-4">
              <span className="text-white text-xl">&#62;</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ServiceCard;
