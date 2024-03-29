"use client";
import React, { useEffect, useState } from "react";
import "./slider.css";
import Image from "next/image";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const Slider = () => {
  const dataSlider = [
    {
      id: 1,
      title: "PB+ LEGAL",
      subtitle:
        "The first foundation of justice is not to hurt anyone.  PB Plus is born with the intention of re-establishing the order and legality within a community with diverse needs.",

      source: "/assets/legalbanner.jpeg",
      linkTitle: "Take a look",
      href: "#learnmore",
    },
    {
      id: 2,
      title: "Immigration Services",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/immigrationservices.jpg",
      linkTitle: "Take a look",
      href: "/legal/immigration-services",
    },
    {
        id: 3,
        title: "Property Regularization",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/propertyregularization.jpg",
        linkTitle: "Take a look",
        href: "/legal/property-regularization",
      },
      {
        id: 4,
        title: "Property Acquisition",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/propertyadquisition.jpg",
        linkTitle: "Take a look",
        href: "/legal/property-acquisition",
      },
      {
        id: 5,
        title: "Court Representation",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/courtrepresentation.jpg",
        linkTitle: "Take a look",
        href: "/legal/court-representation",
      },
      {
        id: 6,
        title: "Legal Consulting",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/legalconsulting.jpg",
        linkTitle: "Take a look",
        href: "/legal/legal-consulting",
      },
      {
        id: 7,
        title: "Formation of Companies",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/formationofcompanies.jpg",
        linkTitle: "Take a look",
        href: "/legal/formation-of-companies",
      },
      {
        id: 8,
        title: "Funeral Arrangements",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/funeralarrangements.jpg",
        linkTitle: "Take a look",
        href: "/legal/funeral-arrangements",
      },
      {
        id: 9,
        title: "Other Legal Services",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
        source: "/assets/otherlegalservices.jpg",
        linkTitle: "Take a look",
        href: "/legal/other-services",
      }
  ];

  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 10000);

    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <div className="container-slider">
      {dataSlider.map((object, index) => (
        <div
          className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          key={index}
        >
          <Image
            alt={object.title}
            src={object.source}
            fill={true}
            sizes="(min-width: 1120px) 1500px"
            className="object-cover object-center"
          />
          <div className="absolute bg-black opacity-50 w-full h-full"></div>

          <div className="mx-auto flex flex-col text-left max-w-[1200px] px-[15px]">
            <div className="w-[50%]">
              <p
                className={
                  slideIndex === index + 1 ? "p-active p-title" : "p-title"
                }
              >
                {object.title}
              </p>
              <p
                className={
                  slideIndex === index + 1
                    ? "p-active p-subtitle"
                    : "p-subtitle"
                }
              >
                {object.subtitle}
              </p>
              <Link
                href={object.href}
                className="flex flex-row items-center gap-1 py-1 text-white text-lg absolute transition-all hover:gap-3 z-10 duration-700"
              >
                <p>{object.linkTitle}</p>
                <IconArrowNarrowRight size={30} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="container-dots">
        {Array.from({ length: dataSlider.length }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
