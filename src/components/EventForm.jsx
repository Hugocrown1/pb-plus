"use client";

import FormInput from "@/components/FormInput";
import { IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteImage } from "@/lib/deleteImage";
import { ReactSortable } from "react-sortablejs";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import EventCard from "./EventCard";
import SpinnerSmall from "./SpinnerSmall";
import { toast } from "sonner";

const EventForm = ({
  title: existingTitle,
  category: existingCategory,
  address: existingAddress,
  description: existingDescription,
  images: existingImages,
  date: existingDate,
  _id,
}) => {
  const [values, setValues] = useState({
    title: existingTitle || "",
    category: existingCategory || "",
    address: existingAddress || "",
    description: existingDescription || "",
    date: existingDate || "",
  });

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackURL=/community/events/new-event");
    },
  });

  const [previewImages, setPreviewImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(new FormData());
  const [deletedImages, setDeletedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const saveEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const responseFiles = await axios.post("/api/files", formData);
    let eventImages = previewImages;

    for (const imageObject of responseFiles.data) {
      const imageIndex = eventImages.findIndex(
        (imageUrl) => imageUrl.toString() === imageObject.originalUrl
      );

      eventImages[imageIndex] = imageObject.linkAws;
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
      await axios.post("/api/events", {
        ...values,

        images: eventImages,
      });

      router.push("/community/events");
      toast.success("Event created successfully!");
    } else {
      await axios.put("/api/events/" + _id, {
        ...values,
        coverImage: eventImages[0],
        images: eventImages,
      });
      router.push("/community/events/" + _id);
      toast.success("Event changes saved successfully!");
    }
  };

  const uploadPreviewImages = (e) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      const url = URL.createObjectURL(files[0]);
      for (const file of files) {
        formData.append(url, file);
      }

      setPreviewImages(previewImages.concat(url));
    }
  };

  const handleRemoveImage = (imageUrl) => {
    if (imageUrl.includes("blob")) {
      formData.delete(imageUrl);
    }

    setDeletedImages(deletedImages.concat(imageUrl));
    setPreviewImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );
  };

  const updatePreviewImagesOrder = (images) => {
    setPreviewImages(images);
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col xl:flex-row w-full h-full gap-10 mt-4 mb-12 pt-[50px]">
      <section className="xl:w-[80%] flex flex-col ">
        <h1 className="text-left text-[42px]">
          {_id ? "Edit event" : "New event"}
        </h1>
        <div className="bg-white w-full flex p-4 shadow-md rounded-xl">
          <form onSubmit={saveEvent}>
            <h3>Basic information</h3>
            <FormInput
              label="Event title"
              name="title"
              id="title"
              maxLength="100"
              placeholder={"Title"}
              value={values.title}
              onChange={onChange}
              errorMessage="Please provide a title"
            />
            <label htmlFor="photos">Photos</label>
            <div className="flex flex-wrap">
              <ReactSortable
                list={previewImages}
                className="flex flex-wrap"
                setList={updatePreviewImagesOrder}
              >
                {!!previewImages?.length &&
                  previewImages.map((link) => (
                    <div
                      key={link}
                      className={`flex relative h-32 w-32 rounded-md m-1 shadow-lg justify-end bg-transparent items-start overflow-hidden`}
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
                        alt="Event photo"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
              </ReactSortable>
              <label
                htmlFor="photos"
                className="flex flex-col items-center m-1 justify-center w-32 h-32 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
              >
                <IconUpload size={22} />
                Cargar
                <input
                  id="photos"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={uploadPreviewImages}
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="type">Event category</label>
              <select
                name="category"
                id="category"
                defaultValue={existingCategory || ""}
                onChange={onChange}
                required
              >
                <option disabled value={""}>
                  Choose a category
                </option>
                <option value={"Sale"}>Sale</option>
                <option value={"Party"}>Party</option>
                <option value={"Meeting"}>Meeting</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            <hr className="stroke-slate-600 my-4" />
            <h3>Event details</h3>

            <FormInput
              type="datetime-local"
              label="Date"
              name="date"
              id="date"
              min={existingDate ? existingDate : new Date().toLocaleString()}
              errorMessage="Please enter a valid date"
              placeholder={"Event date"}
              value={values.date}
              onChange={onChange}
            />
            <FormInput
              label="Address"
              name="address"
              id="address"
              placeholder={"Event address"}
              value={values.address}
              onChange={onChange}
              errorMessage="Please provide an address"
            />
            <div className="form-input">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Event description"
                value={values.description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex w-full justify-between items-end mt-2">
              <Link
                href={_id ? "/community/events/" + _id : "/community/events"}
                className="events-button-outline"
              >
                Cancel
              </Link>
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center justify-center px-4 py-3 mt-4 rounded-lg font-medium text-lg w-[190px]   text-[#FCFFFC] transition-colors  bg-[#0077b6] hover:bg-[#0076b6e1]  text-center disabled:bg-slate-500"
              >
                {isLoading ? <SpinnerSmall /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="xl:w-[30%] w-full flex flex-col items-center xl:items-start ">
        <h1 className=" text-center xl:text-left text-[42px]">Preview</h1>
        <div className=" xl:h-full xl:w-full xl:self-center mx-auto  ">
          <EventCard {...values} coverImage={previewImages[0]} />
        </div>
      </section>
    </div>
  );
};

export default EventForm;
