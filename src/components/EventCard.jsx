"use client";

import { IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import dateFormatter from "@/lib/dateFormatter";

const inter = Inter({ subsets: ["latin"] });

const EventCard = ({ _id, coverImage, date, title, address, category }) => {
  return (
    <article className={`card ${inter.className}`}>
      <Link
        href={_id ? `/community/events/${_id}` : "#"}
        className="flex flex-col h-full"
      >
        <div className="relative h-[58%] aspect-[458/299] bg-gray-300">
          <div className="absolute bg-black/70 px-2 py-1 z-10 rounded-md font-semibold text-white translate-x-[15%] translate-y-[30%]">
            {category || "Category"}
          </div>
          {coverImage && (
            <img
              alt="event cover image"
              src={coverImage}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        <div className="flex flex-col px-4 py-3 h-[42%] ">
          <div className="flex flex-row items-start justify-start gap-1 bg-[#B9E7FE] rounded-3xl px-4 w-fit ">
            <p className="text-left text-lg font-bold text-[#0077b6]  overflow-hidden overflow-ellipsis ">
              {dateFormatter(date)}
            </p>
          </div>

          <p className="text-left text-2xl font-bold overflow-ellipsis overflow-hidden break-words ">
            {title || "Title"}
          </p>
          <div className="flex flex-row items-center text-[#707070] text-nowrap ">
            <IconMapPin min={22} />
            <p className="mt-[2px] text-nowrap overflow-ellipsis overflow-hidden max-w-[203px]">
              {address || "Address"}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;
