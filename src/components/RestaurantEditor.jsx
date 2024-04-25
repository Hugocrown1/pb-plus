"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormInput from "./FormInput";
import { IconPlus, IconUpload, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { deleteImage } from "@/lib/deleteImage";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import SpinnerSmall from "./SpinnerSmall";
import axios from "axios";
import { toast } from "sonner";
import FormFileInput from "./FormFileInput";
import { ReactSortable } from "react-sortablejs";

const RestaurantEditor = ({
  images: existingImages,
  name: existingName,
  address: existingAddress,
  category: existingCategory,
  sectionTitle: existingSectionTitle,
  information: existingInformation,
  calendar: existingCalendar,
  socialMedia: existingSocialMedia,
  _id,
}) => {
  const [values, setValues] = useState({
    name: existingName || "",
    address: existingAddress || "",
    category: existingCategory || "",
    sectionTitle: existingSectionTitle || "",
    information: existingInformation || {
      AboutUs: "",
      CustomSection: "",
    },
    calendar: existingCalendar || {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
    socialMedia: existingSocialMedia || {
      Facebook: "",
      Instagram: "",
      Twitter: "",
    },
  });

  const [weekValues, setWeekValues] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackURL=/community/advertising/new-restaurant");
    },
  });

  const [previewImages, setPreviewImages] = useState(
    existingImages || {
      Profile: "",
      Cover: "",
      AboutUs: "",
      MeetUs1: "",
      MeetUs2: "",
      MeetUs3: "",
      CustomSection: "",
      Gallery: [],
    }
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const uploadPreviewImage = (e) => {
    const files = e.target?.files;
    const name = e.target?.name;
    if (files?.length > 0) {
      let url;
      let hasFile = false;
      uploadedImages.map(([key, value]) => {
        if (value.name === files[0].name) {
          hasFile = true;
          url = key;
        }
      });
      if (!hasFile) {
        url = URL.createObjectURL(files[0]);
        setUploadedImages((prevUploadedImages) =>
          prevUploadedImages.concat([[url, files[0]]])
        );
      }
      let newPreviewImages;
      if (name === "Gallery") {
        newPreviewImages = {
          ...previewImages,
          Gallery: previewImages.Gallery.concat(url),
        };
      } else {
        newPreviewImages = {
          ...previewImages,
          [name]: url,
        };
        const prevURL = previewImages[name];
        const deleteImage = Object.values(newPreviewImages)
          .flat()
          .includes(prevURL);
        if (!deleteImage && !deletedImages.includes(prevURL)) {
          setDeletedImages(deletedImages.concat(prevURL));
          if (prevURL.includes("blob")) {
            setUploadedImages((prevUploadedImages) =>
              prevUploadedImages.filter(([key, value]) => key !== prevURL)
            );
          }
        }
      }
      setPreviewImages(newPreviewImages);
    }
  };

  const uploadInformation = (e) => {
    const value = e.target?.value;
    const name = e.target?.name;
    setValues({
      ...values,
      information: { ...values.information, [name]: value },
    });
  };

  const updatePreviewImagesOrder = (images) => {
    setPreviewImages((prevImages) => ({ ...prevImages, Gallery: images }));
  };

  const handleRemoveImage = (imageUrl) => {
    const deleteImage = Object.values(previewImages).flat().includes(imageUrl);
    if (!deleteImage && !deletedImages.includes(imageUrl)) {
      setDeletedImages(deletedImages.concat(imageUrl));
      if (prevURL.includes("blob")) {
        setUploadedImages((prevUploadedImages) =>
          prevUploadedImages.filter(([key, value]) => key !== imageUrl)
        );
      }
    }
    setPreviewImages((prevImages) => ({
      ...prevImages,
      Gallery: prevImages.Gallery.filter((image) => image !== imageUrl),
    }));
  };

  const saveRestaurant = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    uploadedImages.map(([key, value]) => formData.append(key, value));

    const responseFiles = await axios.post("/api/files", formData);
    let restaurantImages = previewImages;

    for (const imageObject of responseFiles.data) {
      Object.entries(restaurantImages).map(([name, url]) => {
        if (url.toString() === imageObject.originalUrl) {
          restaurantImages[name] = imageObject.linkAws;
        }
      });
    }

    if (deletedImages.length > 0) {
      for (const imageLink of deletedImages) {
        try {
          if (imageLink.includes("pb-plus.s3")) {
            await deleteImage(imageLink);
          }
        } catch (error) {
          console.error(`error deleting image ${imageLink}:`, error);
        }
      }
    }

    if (!_id) {
      await axios.post("/api/restaurants", {
        ...values,
        images: restaurantImages,
      });

      router.push("/community/advertising");

      toast.success("Restaurant created successfully!");
    } else {
      await axios.put("/api/restaurants/" + _id, {
        ...values,
        images: restaurantImages,
      });
      router.push("/community/advertising/" + _id);
      toast.success("Restaurant changes saved successfully!");
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <form className="w-full h-full" onSubmit={saveRestaurant}>
      <section className="relative flex items-end justify-center w-full h-[710px] overflow-hidden shadow-md  ">
        {previewImages.Cover && (
          <Image
            priority
            alt={"cover image"}
            src={previewImages.Cover}
            fill={true}
            sizes="(min-width: 1120px) 1920px"
            className={`object-cover object-center duration-[10000ms]}`}
          />
        )}
        <div className=" absolute h-full w-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col">
              <FormInput
                name="name"
                id="name"
                maxLength={30}
                placeholder={"Restaurant Name"}
                value={values.name}
                onChange={onChange}
              />
              <span className="text-end">
                {values.name.length}/{30}
              </span>
            </div>
            <label
              htmlFor="coverImage"
              className="flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#E7E1E4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
            >
              <IconUpload size={22} />
              Upload
              <input
                id="coverImage"
                name="Cover"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={uploadPreviewImage}
              />
            </label>
          </div>
        </div>
        <div className="absolute right-0 m-2 p-2 rounded-md flex flex-row gap-2 bg-white">
          <button className="community-button" disabled={isLoading}>
            {isLoading ? <SpinnerSmall /> : "Continue"}
          </button>
          <Link
            href={"/community/advertising"}
            className="community-button-outline"
          >
            <p>Cancel</p>
          </Link>
        </div>
      </section>
      <section className="w-full h-[550px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="grid grid-cols-2 gap-7">
            <div className="flex flex-col justify-center">
              <h2 className="text-start font-bold">About Us</h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <textarea
                name="AboutUs"
                id="aboutUs"
                maxLength={400}
                placeholder={"About Us Information"}
                className="flex-1 form-input mt-1"
                value={values.information.AboutUs}
                onChange={uploadInformation}
              />
              <span className="text-end">
                {values.information.AboutUs.length}/{400}
              </span>
            </div>
            <div className=" h-[360px] relative rounded-md overflow-hidden bg-[#f5f3f4]">
              <FormFileInput
                alt={"about us image"}
                id={"aboutUsImage"}
                inputColor={"#E7E1E4"}
                name={"AboutUs"}
                onChange={uploadPreviewImage}
                url={previewImages.AboutUs}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[960px]">
        <div className="container-xl flex justify-center items-center h-full">
          <h2 className="text-start font-bold">Meet Us</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="h-[800px] w-full grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-4 mt-5 ">
            <div className="relative rounded-md overflow-hidden row-span-2  bg-[#E7E1E4]">
              <FormFileInput
                alt={"meet us image 1"}
                id={"meetUsImage1"}
                inputColor={"#f5f3f4"}
                name={"MeetUs1"}
                onChange={uploadPreviewImage}
                url={previewImages.MeetUs1}
              />
            </div>
            <div className="relative rounded-md overflow-hidden  bg-[#E7E1E4]">
              <FormFileInput
                alt={"meet us image 2"}
                id={"meetUsImage2"}
                inputColor={"#f5f3f4"}
                name={"MeetUs2"}
                onChange={uploadPreviewImage}
                url={previewImages.MeetUs2}
              />
            </div>
            <div className="relative rounded-md overflow-hidden h-[300px]  bg-[#E7E1E4]">
              <FormFileInput
                alt={"meet us image 3"}
                id={"meetUsImage3"}
                inputColor={"#f5f3f4"}
                name={"MeetUs3"}
                onChange={uploadPreviewImage}
                url={previewImages.MeetUs3}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[730px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="grid grid-cols-2 gap-7">
            <div className=" h-[630px] relative rounded-md overflow-hidden  bg-[#f5f3f4]">
              <FormFileInput
                alt={"custom section image"}
                id={"customSectionImage"}
                inputColor={"#E7E1E4"}
                name={"CustomSection"}
                onChange={uploadPreviewImage}
                url={previewImages.CustomSection}
              />
            </div>
            <div className="flex flex-col justify-center">
              <FormInput
                name="sectionTitle"
                id="sectionTitle"
                placeholder={"Custom Section Title"}
                value={values.sectionTitle}
                onChange={onChange}
              />

              <div className="flex">
                <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
                <span className="text-end flex-1">
                  {values.sectionTitle.length}/{30}
                </span>
              </div>
              <textarea
                name="CustomSection"
                id="customSection"
                maxLength={400}
                placeholder={"Custom Section Information"}
                className="flex-1 form-input mt-1"
                value={values.information.CustomSection}
                onChange={uploadInformation}
              />
              <span className="text-end">
                {values.information.CustomSection.length}/{400}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[900px] relative">
        <label
          htmlFor="gallery"
          className="absolute right-0 mt-5 mr-24 flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#E7E1E4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
        >
          <IconUpload size={22} />
          Upload
          <span className="text-end">
            {previewImages.Gallery.length}/{9}
          </span>
          <input
            disabled={previewImages.Gallery.length >= 9}
            id="gallery"
            name="Gallery"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={uploadPreviewImage}
          />
        </label>
        <div className="container-xl flex items-center h-full">
          <div className="flex flex-col justify-center items-center mt-10">
            <h2 className="text-start font-bold">Gallery</h2>
            <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          </div>
          {!!previewImages.Gallery?.length && (
            <ReactSortable
              list={previewImages.Gallery}
              className="grid grid-cols-3 gap-[20px] justify-items-center mt-5 w-7/12"
              setList={updatePreviewImagesOrder}
            >
              {previewImages.Gallery.map((link, index) => (
                <div
                  key={"Gallery image" + index}
                  className={`flex relative aspect-square rounded-md shadow-lg justify-end bg-transparent items-start overflow-hidden`}
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(link)}
                    className="absolute p-1 rounded-full bg-black/80 hover:bg-black transition-colors text-white z-10 translate-y-1 -translate-x-1"
                  >
                    <IconX size={20} />
                  </button>
                  <img
                    src={link}
                    alt="Restaurant gallery photo"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </ReactSortable>
          )}
        </div>
      </section>
      <section className="w-full h-[850px] bg-[#E7E1E4]">
        <div className="container-xl flex items-center h-full p-10">
          <h2 className="text-start font-bold">Weekly Calendar</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="grid grid-cols-7 gap-2 w-full flex-1 justify-evenly mt-5 bg-[#f5f3f4] rounded-md overflow-hidden shadow-md p-2">
            {Object.entries(values.calendar).map(([day, items]) => (
              <div className="flex flex-col flex-1 items-center w-full px-5">
                <div className=" flex flex-col w-full justify-center items-center ">
                  <h3 className="text-xl">{day}</h3>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <button
                      disabled={values.calendar[day].length >= 4}
                      type="button"
                      className=" w-5 h-5 flex items-center rounded-full bg-white"
                      onClick={() => {
                        if (weekValues[day] === "") return;
                        setValues((prevValues) => ({
                          ...prevValues,
                          calendar: {
                            ...prevValues.calendar,
                            [day]: prevValues.calendar[day].concat(
                              weekValues[day]
                            ),
                          },
                        }));
                        setWeekValues((prevWeekValues) => ({
                          ...prevWeekValues,
                          [day]: "",
                        }));
                      }}
                    >
                      <IconPlus />
                    </button>
                    {values.calendar[day].length}/{4}
                  </div>
                </div>
                <ul className="flex-1 mt-5 w-full text-justify list-disc">
                  {items.map((item, index) => (
                    <li key={index} className="my-2 break-all flex gap-2">
                      <button
                        type="button"
                        className=" w-5 h-5 flex items-center rounded-full bg-white"
                        onClick={() =>
                          setValues((prevValues) => ({
                            ...prevValues,
                            calendar: {
                              ...prevValues.calendar,
                              [day]: prevValues.calendar[day].filter(
                                (value) => value !== item
                              ),
                            },
                          }))
                        }
                      >
                        <IconX />
                      </button>
                      {item}
                    </li>
                  ))}
                  <div className="mt-5">
                    <textarea
                      className="h-24"
                      maxLength={100}
                      id={day}
                      type="text"
                      value={weekValues[day]}
                      onChange={(e) =>
                        setWeekValues((prevWeekValues) => ({
                          ...prevWeekValues,
                          [day]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <li className="w-full flex justify-end">
                    {weekValues[day].length}/{100}
                  </li>
                </ul>
              </div>
            ))}
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
                  <FormInput
                    label={socialMediaName}
                    id={socialMediaName}
                    name={socialMediaName}
                    value={socialMediaValue}
                    placeholder={`${socialMediaName} Link`}
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
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </form>
  );
};

export default RestaurantEditor;
