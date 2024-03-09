import React from "react";
import Link from "next/link";

const ServiceCommunityCard = ({ children, href, title, icon, style }) => {
  return (
    <article
      className={`group bg-[#FCFFFC] ${style} h-full xl:py-0 py-2 overflow-hidden text-center shadow-lg hover:bg-[#0077b6] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
    >
      <Link href={href}>
        <div className="relative flex w-full h-full items-center justify-center text-xl xl:text-2xl">
          <div className="flex flex-col z-10 px-4 items-center justify-center">
            <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
              {icon}
            </div>
            <p className="font-semibold group-hover:text-white">{title}</p>
            <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
              {children}
            </p>
          </div>
          <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#14213d]"></div>
        </div>
      </Link>
    </article>
  );
};

export default ServiceCommunityCard;
