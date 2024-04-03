"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="rounded-full border border-[#B6B6B6] items-center justify-center w-[30px] h-[30px] ml-[20px] mr-[5px]"
      onClick={() => router.push("/community/events")}
    >
      <IconChevronLeft />
    </button>
  );
};

export default BackButton;
