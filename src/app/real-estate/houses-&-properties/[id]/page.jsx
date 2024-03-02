import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  IconBath,
  IconBed,
  IconPencil,
  IconPhoneFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProperty } from "@/lib/properties";
import DeleteButton from "./DeleteButton";

const page = async ({ params }) => {
  //TODO: Manejo de propiedad no encontrada
  const { id } = params;

  const session = await auth();
  const propertyInfo = await getProperty(id);

  return (
    <main className="container-2xl pt-[60px]">
      <div className="flex flex-col">
        <section className="relative  w-full md:h-[515px] h-[350px] my-4">
          <div className={`relative w-full h-full rounded-lg overflow-hidden`}>
            <Image
              src={propertyInfo.coverImage}
              alt="property photo"
              fill={true}
              sizes="(min-width: 1120px) 1500px"
              className="object-cover object-center"
            />
          </div>
        </section>

        <div className="flex flex-col md:flex-row h-fit gap-2">
          <section className="flex flex-col bg-white items-start px-4 py-2 shadow-lg h-full md:w-[480px] rounded-sm md:hidden">
            <p className="text-[#656b69] text-base">Seller info</p>

            <div className="flex flex-row items-center gap-6 w-full my-auto">
              <img
                src={propertyInfo.user.image}
                alt="seller photo"
                className="object-cover object-center w-[70px] aspect-square rounded-full"
              />

              <div className="flex flex-col w-full text-left">
                <p className="text-xl font-semibold">
                  {propertyInfo.user.name}
                </p>
                <p className="text-base text-[#656b69]">Member</p>
                <div className="flex flex-row items-center justify-center gap-1 w-full border-[1px] border-[#255748] text-[#255748] hover:bg-[#ddeee5] rounded-xl px-4 py-1">
                  <IconPhoneFilled /> <p>000 000 0000</p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col w-full md:w-[75%] px-2">
            <div className="flex md:flex-row flex-col justify-between">
             <div className="my-2">
             {propertyInfo.type === "Selling" && (
                <div className="text-center text-lg text-white font-medium bg-[#40896f] px-4 py-1 md:py-1 rounded-bl-none rounded-2xl md:w-fit md:h-fit">
                  FOR SALE
                </div>
              )}
              {propertyInfo.type === "Rental" && (
                <div className="text-center text-lg text-white font-medium bg-[#40896f] px-4 py-1 md:py-1 rounded-bl-none rounded-2xl md:w-fit md:h-fit">
                  FOR RENT
                </div>
              )}
             </div>
             <div>
             {session?.user.id === propertyInfo.user._id && (
                <div className="flex md:flex-wrap items-center gap-2 justify-between">
                  <Link
                    href={`/real-estate/edit-property/${propertyInfo._id}`}
                    className="real-estate-button"
                  >
                    <IconPencil />
                    <p>Edit</p>
                  </Link>
                  <DeleteButton id={id} />
                </div>
              )}
             </div>
            </div>
            
            <h1 className="text-left md:-my-1 md:text-[64px] text-[32px]">
              {propertyInfo?.title}
            </h1>

            <p className="text-left md:text-[38px] text-[32px] text-[#30725c] font-semibold md:-mt-3">
              ${propertyInfo.price.toLocaleString()}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-row gap-1 items-center bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBath /> <p>{propertyInfo.bathrooms} Baths</p>
              </div>

              <div className="flex flex-row gap-1 items-center bg-[#e6e6e685] text-[#656b69] p-1 w-fit rounded-xl font-medium">
                <IconBed /> <p>{propertyInfo.bedrooms} Beds</p>
              </div>
            </div>
            <hr className="w-[90%] mt-2" />

            <h3 className="md:text-[32px] text-2xl">Description</h3>
            <p>{propertyInfo.description}</p>
          </section>
          <section className="md:flex flex-col bg-white items-start px-4 py-2 shadow-lg h-[175px] md:w-[480px] rounded-sm hidden">
            <p className="text-[#656b69] text-lg">Seller info</p>

            <div className="flex flex-row items-center gap-6 w-full my-auto">
              <img
                src={propertyInfo.user.image}
                alt="seller photo"
                className="object-cover object-center w-[100px] aspect-square rounded-full"
              />

              <div className="flex flex-col w-full text-left">
                <p className="text-xl font-semibold">
                  {propertyInfo.user.name}
                </p>
                <p className="text-base text-[#656b69]">Member</p>
                <div className="flex flex-row items-center justify-center gap-1 w-full border-[1px] border-[#255748] text-[#255748] hover:bg-[#ddeee5] rounded-xl py-2 px-4 mt-2">
                  <IconPhoneFilled /> <p>000 000 0000</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="flex flex-col w-full px-2 my-4">
          <h3 className="text-left md:text-[32px] text-2xl">Gallery</h3>
          <div className="w-full grid grid-cols-2 gap-2 mt-2">
            {propertyInfo.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="property photo"
                className="w-full h-full rounded-xl object-cover object-center"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
