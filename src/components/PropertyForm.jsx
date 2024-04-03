"use client";

import FormInput from "@/components/FormInput";
import PropertyCard from "@/components/PropertyCard";
import { IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteImage } from "@/lib/deleteImage";
import { ReactSortable } from "react-sortablejs";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import SpinnerSmall from "./SpinnerSmall";
import { toast } from "sonner";

const PropertyForm = ({
  title: existingTitle,
  type: existingType,
  bedrooms: existingBedrooms,
  bathrooms: existingBathrooms,
  zone: existingZone,
  address: existingAddress,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  _id,
}) => {
  const [values, setValues] = useState({
    title: existingTitle || "",
    type: existingType || "",
    bedrooms: existingBedrooms || "",
    bathrooms: existingBathrooms || "",
    zone: existingZone || "",
    address: existingAddress || "",
    description: existingDescription || "",
    price: existingPrice || "",
  });

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackURL=/real-estate/new-property");
    },
  });

  const [previewImages, setPreviewImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(new FormData());
  const [deletedImages, setDeletedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const saveProperty = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const responseFiles = await axios.post("/api/files", formData);
    let propertyImages = previewImages;

    for (const imageObject of responseFiles.data) {
      const imageIndex = propertyImages.findIndex(
        (imageUrl) => imageUrl.toString() === imageObject.originalUrl
      );

      propertyImages[imageIndex] = imageObject.linkAws;
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
      await axios.post("/api/properties", {
        ...values,

        images: propertyImages,
      });

      router.push("/real-estate");

      toast.success("Property created successfully!");
    } else {
      await axios.put("/api/properties/" + _id, {
        ...values,
        coverImage: propertyImages[0],
        images: propertyImages,
      });
      router.push("/real-estate/houses-&-properties/" + _id);
      toast.success("Property changes saved successfully!");
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
          {_id ? "Edit property" : "New property"}
        </h1>
        <div className="bg-white w-full flex p-4 shadow-md rounded-xl">
          <form onSubmit={saveProperty}>
            <h3>Basic information</h3>
            <FormInput
              label="Property title"
              name="title"
              id="title"
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
                        alt="Property photo"
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
              <label htmlFor="type">Rental or selling</label>
              <select
                name="type"
                id="type"
                defaultValue={existingType || ""}
                onChange={onChange}
                required
              >
                <option disabled value={""}>
                  Choose a type
                </option>
                <option value={"Rental"}>Rental</option>
                <option value={"Selling"}>Selling</option>
              </select>
            </div>
            <hr className="stroke-slate-600 my-4" />
            <h3>Property details</h3>
            <FormInput
              type="number"
              label="Bedrooms"
              name="bedrooms"
              id="bedrooms"
              placeholder={"Number of bedrooms"}
              errorMessage="Please enter a valid number"
              pattern="^[0-9]{1-6}"
              value={values.bedrooms}
              onChange={onChange}
            />

            <FormInput
              type="number"
              label="Bathrooms"
              name="bathrooms"
              id="bathrooms"
              errorMessage="Please enter a valid number"
              placeholder={"Number of bathrooms"}
              value={values.bathrooms}
              onChange={onChange}
            />
            <div className="form-input">
              <label htmlFor="zone">Zone</label>
              <select
                name="zone"
                id="zone"
                defaultValue={existingZone || ""}
                onChange={onChange}
                required
              >
                <option disabled value={""}>
                  Choose the zone of the property
                </option>
                <option value={"The Ejido"}>The Ejido</option>
                <option value={"Bufadora"}>Bufadora</option>
                <option value={"The Spit"}>The Spit</option>
                <option value={"Maneadero"}>Maneadero</option>
              </select>
            </div>
            <FormInput
              label="Address"
              name="address"
              id="address"
              placeholder={"Property address"}
              value={values.address}
              onChange={onChange}
              errorMessage="Please provide an address"
            />
            <div className="form-input">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Property description"
                value={values.description}
                onChange={onChange}
              ></textarea>
            </div>

            <FormInput
              type="number"
              label="Price"
              name="price"
              id="price"
              errorMessage="Please enter a valid number"
              placeholder={"Price"}
              value={values.price}
              onChange={onChange}
            />
            <div className="flex w-full justify-between items-end mt-2">
              <Link
                href={
                  _id
                    ? "/real-estate/houses-&-properties/" + _id
                    : "/real-estate"
                }
                className="real-estate-button-outline"
              >
                Cancel
              </Link>
              <button
                disabled={isLoading}
                type="submit"
                className="px-4 py-3 mt-4 rounded-lg flex items-center justify-center font-medium text-lg w-[190px]   text-[#FCFFFC] transition-colors  bg-[#40896f] hover:bg-[#30725c]  text-center disabled:bg-slate-500"
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
          <PropertyCard {...values} coverImage={previewImages[0]} />
        </div>
      </section>
    </div>
  );
};

export default PropertyForm;
