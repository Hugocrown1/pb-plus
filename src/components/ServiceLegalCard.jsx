"use client";
import React, { useState } from "react";
import Link from "next/link";

const ServiceCard = ({ children, href, title }) => {

  return (
    <div
      className={`group bg-[#FCFFFC]  text-center hover:bg-[#cba557] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-md rounded-md border-2 border-gray-100`}
      
    >
      <Link href={href}>
        <div className="relative flex items-center justify-start text-xs ">
          <div className="flex flex-col z-10 px-4 items-start justify-center">
            <p className="text-sm xl:text-lg group-hover:text-white py-4 text-gray-800">
              {title}
            </p>
            <p className="text-xs xl:text-sm text-start  text-[#5e5e5e]  group-hover:text-white">
              {children}
            </p>
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
