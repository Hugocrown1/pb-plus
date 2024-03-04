"use client";

import { IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const EventCard = ({ _id, coverImage, date, title, address }) => {
  return (
    <article className={`property-card ${inter.className}`}>
      {_id ? (
        <Link
          href={`/community/events/${_id}`}
          className="flex flex-col h-full"
        >
          <div className="relative h-[58%] aspect-[458/299] bg-gray-300">
            {coverImage && (
              <img
                alt="property cover image"
                src={coverImage}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
          <div className="flex flex-col px-4 py-1 my-auto min-h-[30%]">
            <div className="flex flex-row items-center gap-1 bg-[#B9E7FE] rounded-lg p-2 w-fit">
              <p className="text-left text-lg font-bold text-[#0077b6] max-w-[193pxs] overflow-hidden overflow-ellipsis -mb-1">
                {date.split("T")[0]} at {date.split("T")[1].split(".")[0]}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-left text-2xl font-bold text-[#0077b6] max-w-[193pxs] overflow-hidden overflow-ellipsis -mb-1">
                {}
              </p>
            </div>
            <p className="text-left text-2xl font-bold text-nowrap overflow-ellipsis overflow-hidden">
              {title || "Title"}
            </p>
            <div className="flex flex-row items-center text-[#707070] text-nowrap ">
              <IconMapPin min={22} />
              <p className="mt-[2px] text-nowrap overflow-ellipsis overflow-hidden max-w-[203px]">
                {address || "Address"}
              </p>
            </div>
            <hr className="w-full mx-auto my-2" />
          </div>
        </Link>
      ) : (
        <>
          <div className="relative h-[58%] aspect-[458/299] bg-gray-300">
            <div className="absolute bg-black/70 px-2 py-1 z-10 rounded-md font-semibold text-white translate-x-[15%] translate-y-[30%]">
              {type || "Type"}
            </div>
            {coverImage && (
              <img
                alt="property cover image"
                src={coverImage}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
          <div className="flex flex-col px-4 py-1 my-auto min-h-[30%]">
            <p className="text-left text-2xl font-bold text-nowrap overflow-ellipsis overflow-hidden">
              {title || "Title"}
            </p>
            <div className="flex flex-row items-center text-[#707070] text-nowrap ">
              <IconMapPin min={22} />
              <p className="mt-[2px] text-nowrap overflow-ellipsis overflow-hidden max-w-[203px]">
                {address || "Address"}
              </p>
            </div>
            <hr className="w-full mx-auto my-2" />
          </div>
        </>
      )}
    </article>
  );
};

export default EventCard;
