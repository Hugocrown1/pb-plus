"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormInput from "./FormInput";
import { IconUpload } from "@tabler/icons-react";

const RestaurantPage = ({
  images: existingImages,
  name: existingName,
  sectionTitle: existingSectionTitle,
  information: existingInformation,
  calendar: existingCalendar,
  socialMedia: existingSocialMedia,
}) => {
  const [values, setValues] = useState({
    name: existingName || "Restaurant Name",
    sectionTitle: existingSectionTitle || "Custom Section Title",
    information: existingInformation || [
      "About Us Information",
      "Custom Section Information",
    ],
    calendar: existingCalendar || [],
    socialMedia: existingSocialMedia || {
      Facebook: "",
      Instagram: "",
      Twitter: "",
    },
  });

  const [previewImages, setPreviewImages] = useState(
    existingImages || Array(6).fill("/assets/events.webp")
  );
  const [deletedImages, setDeletedImages] = useState([]);
  const [editing, setEditing] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const uploadPreviewImage = (e, index) => {
    const files = e.target?.files;
    if (files < 0) return;
    const url = URL.createObjectURL(files[0]);
    const newPreviewImages = [
      ...previewImages.slice(0, index),
      url,
      ...previewImages.slice(index + 1),
    ];
    setDeletedImages(deletedImages.concat(previewImages[index]));
    setPreviewImages(newPreviewImages);
  };

  const uploadInformation = (e, index) => {
    const value = e.target?.value;
    const newInformation = [
      ...values.information.slice(0, index),
      value,
      ...values.information.slice(index + 1),
    ];
    setValues({ ...values, information: newInformation });
  };
  return (
    <>
      <section className="relative flex items-end justify-center w-full h-[710px] overflow-hidden shadow-md">
        <Image
          priority
          alt={"cover image"}
          src={previewImages[0]}
          fill={true}
          sizes="(min-width: 1120px) 1920px"
          className={`object-cover object-center duration-[10000ms]}`}
        />
        <div className=" absolute h-full w-full flex justify-center items-center">
          {editing ? (
            <div className="flex flex-col items-center justify-center">
              <FormInput
                name="name"
                id="name"
                value={values.name}
                onChange={onChange}
              />
              <label
                htmlFor="coverImage"
                className="flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
              >
                <IconUpload size={22} />
                Cargar
                <input
                  id="coverImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => uploadPreviewImage(e, 0)}
                />
              </label>
            </div>
          ) : (
            <h1 className=" text-white ">{values.name}</h1>
          )}
        </div>
      </section>
      <section className="w-full h-[550px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col max-w-[560px] min-w-[560px] justify-center">
              <h2 className="text-start font-bold">About Us</h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              {editing ? (
                <textarea
                  name="aboutUs"
                  id="aboutUs"
                  className="min-h-[300px] form-input mt-1"
                  value={values.information[0]}
                  onChange={(e) => uploadInformation(e, 0)}
                />
              ) : (
                <p className="mt-2">{values.information[0]}</p>
              )}
            </div>
            <div className="w-[630px] h-[360px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"about us image"}
                src={previewImages[1]}
                fill={true}
                sizes="630px"
                className={`object-cover object-center`}
              />
              {editing && (
                <div className="w-full h-full flex justify-center items-center">
                  <label
                    htmlFor="aboutUsImage"
                    className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="aboutUsImage"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => uploadPreviewImage(e, 1)}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[960px]">
        <div className="container-xl flex justify-center items-center h-full">
          <h2 className="text-start font-bold">Meet Us</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="h-[800px] w-full grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-4 mt-5 ">
            <div className="relative rounded-md overflow-hidden row-span-2">
              <Image
                priority
                alt={"meet us image 1"}
                src={previewImages[2]}
                fill={true}
                className={`object-cover object-center`}
              />
              {editing && (
                <div className="w-full h-full flex justify-center items-center">
                  <label
                    htmlFor="meetUsImage1"
                    className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="meetUsImage1"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => uploadPreviewImage(e, 2)}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"meet us image 2"}
                src={previewImages[3]}
                fill={true}
                className={`object-cover object-center`}
              />
              {editing && (
                <div className="w-full h-full flex justify-center items-center">
                  <label
                    htmlFor="meetUsImage2"
                    className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="meetUsImage2"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => uploadPreviewImage(e, 3)}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="relative rounded-md overflow-hidden h-[300px]">
              <Image
                priority
                alt={"meet us image 3"}
                src={previewImages[4]}
                fill={true}
                className={`object-cover object-center`}
              />
              {editing && (
                <div className="w-full h-full flex justify-center items-center">
                  <label
                    htmlFor="meetUsImage3"
                    className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="meetUsImage3"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => uploadPreviewImage(e, 4)}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[730px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="flex flex-row gap-10 items-start">
            <div className="w-[630px] h-[630px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"custom section image"}
                src={previewImages[5]}
                fill={true}
                sizes="630px"
                className={`object-cover object-center`}
              />
              {editing && (
                <div className="w-full h-full flex justify-center items-center">
                  <label
                    htmlFor="customSectionImage"
                    className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="customSectionImage"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => uploadPreviewImage(e, 5)}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="flex flex-col max-w-[560px] justify-center">
              {editing ? (
                <FormInput
                  name="sectionTitle"
                  id="sectionTitle"
                  value={values.sectionTitle}
                  onChange={onChange}
                />
              ) : (
                <h2 className="text-start font-bold">{values.sectionTitle}</h2>
              )}
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              {editing ? (
                <textarea
                  name="aboutUs"
                  id="aboutUs"
                  className="min-h-[300px] form-input mt-1 min-w-[560px]"
                  value={values.information[1]}
                  onChange={(e) => uploadInformation(e, 1)}
                />
              ) : (
                <p className="mt-2">{values.information[1]}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[660px]">
        <div className="container-xl flex flex-col items-center h-full">
          <h2 className="text-start font-bold mt-14">Our social media</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="grid grid-flow-col w-full justify-items-center mt-10">
            {Object.entries(values.socialMedia).map(
              ([socialMediaName, socialMediaValue]) => (
                <div
                  className="w-[300px] aspect-square rounded-full bg-[#D9D9D9] flex items-center justify-center"
                  key={socialMediaName}
                >
                  {editing ? (
                    <FormInput
                      label={socialMediaName}
                      id={socialMediaName}
                      name={socialMediaName}
                      value={socialMediaValue}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          socialMedia: {
                            ...values.socialMedia,
                            [socialMediaName]: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <h2>{socialMediaName}</h2>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantPage;
