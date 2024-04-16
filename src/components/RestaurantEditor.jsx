"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormInput from "./FormInput";
import { IconUpload } from "@tabler/icons-react";
import Link from "next/link";
import { deleteImage } from "@/lib/deleteImage";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import SpinnerSmall from "./SpinnerSmall";
import axios from "axios";
import { toast } from "sonner";

const RestaurantEditor = ({
  images: existingImages,
  name: existingName,
  sectionTitle: existingSectionTitle,
  information: existingInformation,
  calendar: existingCalendar,
  socialMedia: existingSocialMedia,
  _id,
}) => {
  const [values, setValues] = useState({
    name: existingName || "",
    sectionTitle: existingSectionTitle || "",
    information: existingInformation || {
      AboutUs: "",
      CustomSection: "",
    },
    calendar: existingCalendar || [],
    socialMedia: existingSocialMedia || {
      Facebook: "",
      Instagram: "",
      Twitter: "",
    },
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
      Cover: "",
      AboutUs: "",
      MeetUs1: "",
      MeetUs2: "",
      MeetUs3: "",
      CustomSection: "",
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
      const newPreviewImages = {
        ...previewImages,
        [name]: url,
      };
      const prevURL = previewImages[name];
      setPreviewImages(newPreviewImages);
      const deleteImage = Object.values(newPreviewImages).includes(prevURL);
      if (!deleteImage && !deletedImages.includes(prevURL)) {
        setDeletedImages(deletedImages.concat(prevURL));
        if (prevURL.includes("blob")) {
          setUploadedImages((prevUploadedImages) =>
            prevUploadedImages.filter(([key, value]) => key !== prevURL)
          );
        }
      }
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
          <div className="flex flex-col items-center justify-center gap-5">
            <FormInput
              name="name"
              id="name"
              placeholder={"Restaurant Name"}
              value={values.name}
              onChange={onChange}
            />
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
                accept="image/png, image/jpeg"
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
          <div className="flex flex-row gap-10">
            <div className="flex flex-col max-w-[560px] min-w-[560px] justify-center">
              <h2 className="text-start font-bold">About Us</h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <textarea
                name="AboutUs"
                id="aboutUs"
                placeholder={"About Us Information"}
                className="min-h-[300px] form-input mt-1"
                value={values.information.AboutUs}
                onChange={uploadInformation}
              />
            </div>
            <div className="w-[630px] h-[360px] relative rounded-md overflow-hidden bg-[#f5f3f4]">
              {previewImages.AboutUs && (
                <Image
                  priority
                  alt={"about us image"}
                  src={previewImages.AboutUs}
                  fill={true}
                  sizes="630px"
                  className={`object-cover object-center`}
                />
              )}

              <div className="w-full h-full flex justify-center items-center">
                <label
                  htmlFor="aboutUsImage"
                  className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#E7E1E4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                >
                  <IconUpload size={22} />
                  Upload
                  <input
                    id="aboutUsImage"
                    name="AboutUs"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadPreviewImage}
                  />
                </label>
              </div>
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
              {previewImages.MeetUs1 && (
                <Image
                  priority
                  alt={"meet us image 1"}
                  src={previewImages.MeetUs1}
                  fill={true}
                  className={`object-cover object-center`}
                />
              )}

              <div className="w-full h-full flex justify-center items-center ">
                <label
                  htmlFor="meetUsImage1"
                  className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                >
                  <IconUpload size={22} />
                  Upload
                  <input
                    id="meetUsImage1"
                    name="MeetUs1"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadPreviewImage}
                  />
                </label>
              </div>
            </div>
            <div className="relative rounded-md overflow-hidden  bg-[#E7E1E4]">
              {previewImages.MeetUs2 && (
                <Image
                  priority
                  alt={"meet us image 2"}
                  src={previewImages.MeetUs2}
                  fill={true}
                  className={`object-cover object-center`}
                />
              )}

              <div className="w-full h-full flex justify-center items-center">
                <label
                  htmlFor="meetUsImage2"
                  className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                >
                  <IconUpload size={22} />
                  Upload
                  <input
                    id="meetUsImage2"
                    name="MeetUs2"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadPreviewImage}
                  />
                </label>
              </div>
            </div>
            <div className="relative rounded-md overflow-hidden h-[300px]  bg-[#E7E1E4]">
              {previewImages.MeetUs3 && (
                <Image
                  priority
                  alt={"meet us image 3"}
                  src={previewImages.MeetUs3}
                  fill={true}
                  className={`object-cover object-center`}
                />
              )}

              <div className="w-full h-full flex justify-center items-center">
                <label
                  htmlFor="meetUsImage3"
                  className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                >
                  <IconUpload size={22} />
                  Upload
                  <input
                    id="meetUsImage3"
                    name="MeetUs3"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadPreviewImage}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[730px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="flex flex-row gap-10 items-start">
            <div className="w-[630px] h-[630px] relative rounded-md overflow-hidden  bg-[#f5f3f4]">
              {previewImages.CustomSection && (
                <Image
                  priority
                  alt={"custom section image"}
                  src={previewImages.CustomSection}
                  fill={true}
                  sizes="630px"
                  className={`object-cover object-center`}
                />
              )}

              <div className="w-full h-full flex justify-center items-center">
                <label
                  htmlFor="customSectionImage"
                  className="absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#E7E1E4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                >
                  <IconUpload size={22} />
                  Upload
                  <input
                    id="customSectionImage"
                    name="CustomSection"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadPreviewImage}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col max-w-[560px] justify-center">
              <FormInput
                name="sectionTitle"
                id="sectionTitle"
                placeholder={"Custom Section Title"}
                value={values.sectionTitle}
                onChange={onChange}
              />
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <textarea
                name="CustomSection"
                id="customSection"
                placeholder={"Custom Section Information"}
                className="min-h-[300px] form-input mt-1 min-w-[560px]"
                value={values.information.CustomSection}
                onChange={uploadInformation}
              />
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
