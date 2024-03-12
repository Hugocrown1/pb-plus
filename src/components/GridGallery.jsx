"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

const data = [
  "/assets/gallery/puntabanda.jpg",
  "/assets/gallery/puntabanda2.jpg",
  "/assets/gallery/puntabanda3.jpg",
  "/assets/gallery/puntabanda4.jpg",
  "/assets/gallery/puntabanda5.jpg",
  "/assets/gallery/puntabanda6.jpg",
  "/assets/gallery/puntabanda7.webp",
  "/assets/gallery/puntabanda8.jpg",
  "/assets/gallery/puntabanda9.webp",
];

const GridGallery = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [exposedImage, setExposedImage] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseGallery();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenGallery = (image) => {
    setGalleryOpen(true);
    setExposedImage(image);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    setExposedImage("");
  };
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full aspect-square">
        {data.map((item) => (
          <div
            key={item}
            onClick={() => handleOpenGallery(item)}
            className="w-full h-full relative cursor-pointer overflow-hidden"
          >
            <Image
              src={item}
              alt="About PB Plus image"
              fill={true}
              sizes="(min-width: 1120px) 1200px"
              className="object-cover object-center hover:scale-110 transition-all"
            />
          </div>
        ))}
      </div>
      <div
        className={`fixed flex items-start inset-0  bg-zinc-950/80 py-14 transition-transform z-40 w-full ${
          !galleryOpen && "invisible"
        } `}
      >
        <div
          className="absolute inset-0 text-white hover:bg-black/90 rounded-full transition-all mx-2 my-2 h-fit w-fit"
          onClick={handleCloseGallery}
        >
          <IconX size={60} />
        </div>
        <dialog className="relative flex max-w-[900px] max-h-[1000px] overflow-hidden">
          <div className="w-full h-full">
            <img
              src={exposedImage}
              alt="About PB Plus image"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default GridGallery;
