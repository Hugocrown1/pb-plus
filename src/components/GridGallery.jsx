"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import ImageGallery from "react-image-gallery";
import ReactImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

const GridGallery = ({ data }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [startIndex, setStartIndex] = useState();

  const images = data.map((image) => ({
    original: image,
    thumbnail: image,
    originalClass: "image-gallery",
  }));

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

  const handleOpenGallery = () => {
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full aspect-square">
        {data.map((item, index) => (
          <div
            key={item}
            onClick={() => {
              handleOpenGallery(item), setStartIndex(index);
            }}
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
        onClick={handleCloseGallery}
        className={`fixed flex items-center inset-0  bg-zinc-950/80 transition-transform z-40  ${
          !galleryOpen && "hidden"
        } `}
      >
        <div
          className="absolute inset-0 text-white hover:bg-black/90 rounded-full transition-all mx-2 my-2 h-fit w-fit"
          onClick={handleCloseGallery}
        >
          <IconX size={60} />
        </div>
        <dialog
          className=" justify-center items-center h-[80%]  flex  bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <ReactImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets={true}
            startIndex={startIndex}
          />
        </dialog>
      </div>
    </>
  );
};

export default GridGallery;
