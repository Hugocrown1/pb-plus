import React from "react";
import Image from "next/image";
import Link from "next/link";

const DepartmentCard = ({ children, src, title, href }) => {
  return (
    <article className="flex flex-col items-center bg-white w-[360px] h-[618px] border border-black/10 shadow-sm transition-all hover:-translate-y-4 hover:shadow-lg">
      <Image
        src={src}
        width={"360"}
        height={"264"}
        alt="Department image"
        className="mb-4"
      />
      <p className="text-[#0A100D] font-bold text-[32px]">{title}</p>
      <div className="h-[7px] w-[121px] bg-[#941B0C] rounded-[8px] mt-1"></div>

      <div className="flex flex-col items-center px-3 justify-evenly mt-6 gap-4 ">
        <p className="text-center justify-center text-[#0A100D] font-light text-[20px] h-[150px] ">
          {children}
        </p>
        <Link
          href={href}
          className="primary-button yellow-button h-[46px] w-[195px] flex justify-center items-center "
        >
          Read more
        </Link>
      </div>
    </article>
  );
};

export default DepartmentCard;
