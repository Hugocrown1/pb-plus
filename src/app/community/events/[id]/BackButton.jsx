"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex rounded-md border border-[#B6B6B6] items-center justify-center w-[100px] h-[40px] ml-[20px] mr-[5px] bg-white hover:bg-[#f4f4f5]"
      onClick={() => router.push("/community/events")}
    >
      <IconChevronLeft /> Back
    </button>
  );
};

export default BackButton;
