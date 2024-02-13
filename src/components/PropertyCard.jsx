"use client";

import { IconBath, IconBed, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const PropertyCard = ({
  _id,
  title,
  address,
  price,
  type,
  coverImage,
  bathrooms,
  bedrooms,
}) => {
  // const [favorited, setFavorited] = useState(false);

  const numberFormatter = (numberString) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
      return "0.00";
    }

    const formattedNumber = number.toLocaleString();

    return formattedNumber;
  };

  // const handleCheckbox = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   setFavorited((prevFavorited) => !prevFavorited);
  // };
  return (
    <article className={`property-card ${inter.className}`}>
      {_id ? (
        <Link
          href={`/real-estate/houses-&-properties/${_id}`}
          className="flex flex-col h-full"
        >
          <div className="relative w-full h-[58%] bg-gray-300">
            <div className="absolute bg-black/70 px-2 py-1 z-10 rounded-md font-semibold text-white translate-x-[12%] translate-y-[20%]">
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
          <div className="flex flex-col  px-4 my-auto">
            <div className="flex flex-row items-center gap-1">
              <p className="text-left text-2xl font-bold text-[#30725C] max-w-[193pxs] overflow-hidden overflow-ellipsis">
                ${numberFormatter(price)}
              </p>
              {type === "Rental" && <p className="text-[#707070]">/month</p>}
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
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBath /> <p>{bathrooms} Baths</p>
              </div>
              <div className="flex flex-row gap-1 items-center  bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBed /> <p>{bedrooms} Beds</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <>
          <div className="relative w-full h-[58%] bg-gray-300">
            <div className="absolute bg-black/70 px-2 py-1 z-10 rounded-md font-semibold text-white translate-x-[12%] translate-y-[20%]">
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
          <div className="flex flex-col px-4 my-auto">
            <div className="flex flex-row items-center gap-1">
              <p className="text-left text-2xl font-bold text-[#30725C] max-w-[193pxs] overflow-hidden overflow-ellipsis">
                ${numberFormatter(price)}
              </p>
              {type === "Rental" && <p className="text-[#707070]">/month</p>}
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
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBath /> <p>{bathrooms} Baths</p>
              </div>
              <div className="flex flex-row gap-1 items-center bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBed /> <p>{bedrooms} Beds</p>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default PropertyCard;
