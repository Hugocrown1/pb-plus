"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const BackButton = () => {
  return (
    <Link
      href={"/community/advertising"}
      className="flex rounded-md border border-[#B6B6B6] items-center justify-center w-[100px] h-[40px] ml-[20px] mr-[5px] bg-white hover:bg-[#f4f4f5]"
    >
      <IconChevronLeft /> Back
    </Link>
  );
};

export default BackButton;
