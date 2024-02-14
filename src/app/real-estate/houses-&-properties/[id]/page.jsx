"use client";
import Spinner from "@/components/Spinner";
import {
  IconBathFilled,
  IconBedFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  const router = useRouter();

  const [propertyInfo, setPropertyInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/properties/" + id).then((res) => {
      setPropertyInfo(res.data);
    });
  }, [id]);

  const deleteProperty = async () => {
    await axios.delete("/api/properties/" + propertyInfo._id);
    router.push("/real-estate");
  };

  if (!propertyInfo) {
    return (
      <main className="bg-[#f5f3f4] min-h-[800px] flex items-center justify-center ">
        <div className="w-[400px] my-12 h-[400px]">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <main className="container-xl pt-[60px]">
      <section className="flex flex-col">
        <h1 className="text-left">{propertyInfo?.title}</h1>
        <div className="relative grid grid-cols-4 grid-rows-2 w-full h-[515px] gap-1">
          {propertyInfo.images.map((image, index) => {
            return (
              <div
                key={index}
                className={`relative ${
                  index === 0 && "col-span-4 row-span-2"
                } rounded-lg overflow-hidden`}
              >
                <Image
                  src={image}
                  alt="property photo"
                  fill={true}
                  sizes="(min-width: 1120px) 1000px"
                  className="object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col bg-white min-h-[450px] my-6 px-4 py-1 shadow-md">
          <div className="flex flex-row justify-between">
            {propertyInfo.type === "Selling" && (
              <h2 className="text-left text-[42px] font-bold">
                House for sale
              </h2>
            )}
            {propertyInfo.type === "Rental" && (
              <h2 className="text-left text-[42px] font-bold">
                House for rent
              </h2>
            )}
            {session?.user.id === propertyInfo.user._id && (
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/real-estate/edit-property/${propertyInfo._id}`}
                  className="real-estate-button"
                >
                  <IconPencil />
                  <p>Edit</p>
                </Link>
                <button
                  onClick={deleteProperty}
                  className="real-estate-button-outline"
                >
                  <IconTrash />
                  <p>Delete</p>
                </button>
              </div>
            )}
          </div>
          <p className="text-left text-[38px] text-[#30725c] font-semibold -mt-3">
            ${propertyInfo.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-1">
              <IconBathFilled color="#30725c" />
              <p className="font-semibold ">
                {propertyInfo.bathrooms} bathrooms
              </p>
            </div>
            <p className="text-lg">·</p>
            <div className="flex flex-wrap items-center gap-1">
              <IconBedFilled color="#30725c" />
              <p className="font-semibold ">{propertyInfo.bedrooms} bedrooms</p>
            </div>
          </div>
          <div className="flex flex-col w-full my-4 gap-2">
            <hr className="stroke-slate-400 w-[100%] mx-auto" />
            <div className="flex flex-row items-center gap-2">
              <img
                src={propertyInfo.user.image}
                alt="seller photo"
                className="rounded-full object-cover aspect-auto w-[80px] h-[80px]"
              />
              <div className="flex flex-col text-left">
                <p className="text-sm">Seller:</p>
                <p className="text-lg font-semibold">
                  {propertyInfo.user.name}
                </p>
              </div>
            </div>
            <hr className="stroke-slate-400 w-[100%] mx-auto" />
          </div>
          <h3 className="text-[32px]">Description</h3>
          <p>{propertyInfo.description}</p>
        </div>
      </section>
    </main>
  );
};

export default page;
