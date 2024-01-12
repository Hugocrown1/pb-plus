import { IconHeart, IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";

import Image from "next/image";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const PropertyCard = ({ title, address, price, type }) => {
  const [favorited, setFavorited] = useState(false);

  const handleCheckbox = (e) => {
    setFavorited(!favorited);
  };
  return (
    <article className={`property-card ${inter.className}`}>
      <div className="relative w-full h-[56%]">
        <div className="absolute bg-black/70 px-2 py-1 z-10 rounded-md font-semibold text-white translate-x-[12%] translate-y-[20%]">
          {type || "Type"}
        </div>
        <Image
          alt="property cover image"
          src={"/assets/real_estate.jpg"}
          fill={true}
          sizes="(min-width: 1120px) 248px"
        />
      </div>
      <div className="flex flex-col px-3 py-2">
        <div className="flex justify-between">
          <p className="text-left text-2xl font-bold text-[#621708]">
            ${price || "0.00"}
          </p>
          <input
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
        <p className="text-left text-xl font-bold ">{title || "Title"}</p>
        <div className="flex flex-row items-center text-[#707070] ">
          <IconMapPin size={22} />{" "}
          <p className="mt-[4px]">{address || "Address"}</p>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
