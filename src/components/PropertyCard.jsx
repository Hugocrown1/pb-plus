"use client";

import { IconHeart, IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const PropertyCard = ({ _id, title, address, price, type, coverImage }) => {
  const [favorited, setFavorited] = useState(false);

  const numberFormatter = (numberString) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
      return "0.00";
    }

    const formattedNumber = number.toLocaleString();

    return formattedNumber;
  };

  const handleCheckbox = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorited((prevFavorited) => !prevFavorited);
  };
  return (
    <article className={` ${inter.className}`}>
      {_id ? (
        <Link
          href={`/real-estate/houses-&-properties/${_id}`}
          className="property-card"
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
          <div className="flex flex-col px-3 py-2">
            <div className="flex justify-between">
              <p className="text-left text-2xl font-bold text-[#30725C] max-w-[193pxs] overflow-hidden overflow-ellipsis">
                ${numberFormatter(price)}
              </p>
              <input
                className="favorite"
                value="favorite-button"
                name="favorite-checkbox"
                id={`favorite-${_id}`}
                checked={favorited}
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                onChange={handleCheckbox}
              />

              <label
                onClick={(e) => e.stopPropagation()}
                className="container"
                htmlFor={`favorite-${_id}`}
              >
                <svg
                  onClick={(e) => e.stopPropagation()}
                  className="feather feather-heart"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </label>
            </div>
            <p className="text-left text-xl font-bold text-nowrap overflow-ellipsis overflow-hidden">
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
      ) : (
        <div className="property-card">
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
          <div className="flex flex-col px-3 py-2">
            <div className="flex justify-between">
              <p className="text-left text-2xl font-bold text-[#30725C] max-w-[193pxs] overflow-hidden overflow-ellipsis">
                ${numberFormatter(price)}
              </p>
              <input
                className="favorite"
                value="favorite-button"
                name="favorite-checkbox"
                id="favorite"
                checked={favorited}
                type="checkbox"
                onChange={handleCheckbox}
              />
              <label className="container" htmlFor="favorite">
                <svg
                  className="feather feather-heart"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </label>
            </div>
            <p className="text-left text-xl font-bold text-nowrap overflow-ellipsis overflow-hidden">
              {title || "Title"}
            </p>
            <div className="flex flex-row items-center text-[#707070] text-nowrap ">
              <IconMapPin min={22} />
              <p className="mt-[2px] text-nowrap overflow-ellipsis overflow-hidden max-w-[203px]">
                {address || "Address"}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default PropertyCard;
