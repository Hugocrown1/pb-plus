"use client"
import React, { useState } from "react";
import Link from "next/link";

const ServiceCard = ({ href, title, icon, style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`group bg-[#FCFFFC] ${style} overflow-hidden text-center shadow-lg hover:bg-[#3B475C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>
        <div className="relative flex w-full h-full items-center justify-center text-2xl">
          <div className="flex flex-col z-10 px-4 items-center justify-center">
            <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
              {icon}
            </div>
            <p className="font-semibold group-hover:text-white py-4">{title}</p>
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
