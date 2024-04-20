import { IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import dateFormatter from "@/lib/dateFormatter";
import InterestedUserButton from "./InterestedUserButton";
import mongoose from "mongoose";

const inter = Inter({ subsets: ["latin"] });

const EventCard = ({
  _id,
  coverImage,
  date,
  title,
  address,
  category,
  user,
  userSession,
  interested,
}) => {
  const isUserInterested = interested?.some(
    (id) => id.toString() === userSession?.id
  );

  const isUserEventOwner = userSession?.id === user?.toString();

  return (
    <article className={`card ${inter.className}`}>
      <Link
        href={_id ? `/community/events/${_id}` : "#"}
        className="flex flex-col h-full "
      >
        <div className="relative max-h-[600px] aspect-[458/299] bg-gray-300 overflow-hidden">
          {coverImage && (
            <img
              alt="event cover image"
              src={coverImage}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        <div className="flex flex-col px-4 py-3 h-full ">
          <span className="flex  items-start justify-start gap-1 font-semibold bg-[#e6e6e685] text-[#656b69] rounded-full px-4 w-fit ">
            {dateFormatter(date)}
          </span>

          <span className="text-left text-2xl font-bold overflow-ellipsis overflow-hidden break-words ">
            {title || "Title"}
          </span>
          <span className="text-left text-[14px] font-bold text-[#575757]   -mt-1">
            {category || "Category"}
          </span>
          <div className="flex flex-row items-center text-[#707070] text-nowrap ">
            <IconMapPin min={22} />
            <p className="mt-[2px] text-nowrap overflow-ellipsis overflow-hidden max-w-[203px]">
              {address || "Address"}
            </p>
          </div>

          {!_id && (
            <div className=" h-10 w-full ">
              {!isUserEventOwner && (
                <InterestedUserButton
                  eventId={_id.toString()}
                  isUserInterested={isUserInterested}
                  isUserEventOwner={isUserEventOwner}
                />
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default EventCard;
