"use client";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;

  const [propertyInfo, setPropertyInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/properties/" + id).then((res) => {
      setPropertyInfo(res.data);
    });
  }, [id]);

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
    <main className="container-xl">
      <section className="flex flex-col">
        <h1 className="text-left">{propertyInfo?.title}</h1>
        <div className="relative grid grid-cols-4 grid-rows-2 w-full h-[515px] gap-2">
          <div className="relative col-span-2 row-span-2">
            <Image
              src={propertyInfo?.coverImage}
              alt="cover image"
              fill={true}
              sizes="(min-width: 1120px) 248px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative ">
            <Image
              src={propertyInfo?.coverImage}
              alt="cover image"
              fill={true}
              sizes="(min-width: 1120px) 248px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative ">
            <Image
              src={propertyInfo?.coverImage}
              alt="cover image"
              fill={true}
              sizes="(min-width: 1120px) 248px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative ">
            <Image
              src={propertyInfo?.coverImage}
              alt="cover image"
              fill={true}
              sizes="(min-width: 1120px) 248px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative ">
            <Image
              src={propertyInfo?.coverImage}
              alt="cover image"
              fill={true}
              sizes="(min-width: 1120px) 248px"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col bg-white min-h-[300px] my-6">
          <h2>Description</h2>
        </div>
      </section>
    </main>
  );
};

export default page;
