"use client";

import FormInput from "@/components/FormInput";
import { IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { deleteImage } from "@/lib/deleteImage";
import { ReactSortable } from "react-sortablejs";
import { useSession } from "next-auth/react";
import EventCard from "../EventCard";
import { toast } from "sonner";

const EventAdminView = ({
  title: existingTitle,
  category: existingCategory,
  address: existingAddress,
  description: existingDescription,
  images: existingImages,
  date: existingDate,
  _id,
  onClose,
}) => {
  const [values, setValues] = useState({
    title: existingTitle || "",
    category: existingCategory || "",
    address: existingAddress || "",
    description: existingDescription || "",
    date: existingDate || "",
    coverImage: existingImages ? existingImages[0] : "",
  });

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackURL=/real-estate/new-event");
    },
  });

  const [previewImages, setPreviewImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(new FormData());
  const [deletedImages, setDeletedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const saveEvent = async (e) => {
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

      onClose();
      toast.success("Event created successfully!");
    } else {
      await axios.put("/api/events/" + _id, {
        ...values,
        coverImage: eventImages[0],
        images: eventImages,
      });
      onClose();
      toast.success("Event changes saved successfully!");
    }
  };

  const deleteEvent = async () => {
    await axios.delete("/api/events/" + _id);
    onClose();
    toast.info("Event deleted successfully!");
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
    return <div>loading</div>;
  }

  const handleUpdateConfirmation = () => {
    saveEvent();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    deleteEvent();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

  function formatDate(date) {
    if (!(date instanceof Date)) return '';
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full  flex justify-center items-center">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-screen-md mx-4 z-50">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            {_id ? "Edit property" : "New property"}
          </p>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold bg-gray-200 hover:text-black rounded-md"
          >
            <IconX size={30}></IconX>
          </button>
        </div>
        <div className="border-t border-gray-300 pt-4 my-2"></div>
        <section
          className="xl:flex xl:gap-2"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowUpdateConfirmation(true);
            }}
            className="xl:w-[60%]"
          >
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

            <p>{values.date}</p>
            <FormInput
    type="datetime-local"
    label="Date"
    name="date"
    id="date"
    min={existingDate ? formatDate(existingDate) : new Date().toISOString().slice(0, 16)}
    errorMessage="Please enter a valid date"
    placeholder={"Event date"}
    value={values.date ? values.date.slice(0, 16) : ''}
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
            <div className="flex justify-between gap-2 py-4">
              <button
                type="submit"
                className="bg-[#3e8acc] hover:bg-blue-800 text-white hover:text-white px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirmation(true);
                }}
                className="bg-[#f6f8fa] hover:bg-[#e00202] text-[#e00202] hover:text-white px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </form>

          <div className="xl:w-[40%]">
            <h3>Preview</h3>
            <div className="h-fit border-2 border-gray-100 rounded-md">
              <EventCard event={{...values, coverImage: previewImages[0]}} />
            </div>
          </div>
        </section>
      </div>
      {/* Update Confirmation Modal */}
      {showUpdateConfirmation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="w-full border-b-2 mb-8 text-sm font-semibold">
              Update Event
            </p>
            <p className="font-semibold text-lg">
              Are you sure you want to update?
            </p>
            <p className="text-sm">
              This action will make changes to the user's data.
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateConfirmation}
                className="bg-[#3e8acc] hover:bg-blue-800 text-white hover:text-white px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setShowUpdateConfirmation(false);
                  setShowDeleteConfirmation(false);
                }}
                className="bg-[#f6f8fa] hover:bg-gray-200 text-gray-800 hover:text-gray-900 px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="w-full border-b-2 mb-8 text-sm font-semibold">
              Delete Event
            </p>
            <p className="font-semibold text-lg">
              Are you sure you want to delete?
            </p>
            <p className="text-sm">
              This action is permanent and cannot be undone.
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDeleteConfirmation}
                className="bg-[#e00202] hover:bg-red-800 text-white hover:text-white px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowUpdateConfirmation(false);
                  setShowDeleteConfirmation(false);
                }}
                className="bg-[#f6f8fa] hover:bg-gray-200 text-gray-800 hover:text-gray-900 px-4 py-2 rounded-md w-1/2 border border-gray-300 transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAdminView;
