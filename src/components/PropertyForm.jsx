"use client";

import FormInput from "@/components/FormInput";
import PropertyCard from "@/components/PropertyCard";
import { IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteImage } from "@/lib/deleteImage";
import { ReactSortable } from "react-sortablejs";

const PropertyForm = ({
  title: existingTitle,
  type: existingType,
  bedrooms: existingBedrooms,
  bathrooms: existingBathrooms,
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
    address: existingAddress || "",
    description: existingDescription || "",
    price: existingPrice || "",
  });

  const router = useRouter();

  const [previewImages, setPreviewImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(new FormData());
  const [deletedImages, setDeletedImages] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const saveProperty = async (e) => {
    e.preventDefault();
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
    } else {
      await axios.put("/api/properties/" + _id, {
        ...values,
        coverImage: propertyImages[0],
        images: propertyImages,
      });
      router.push("/real-estate/property/" + _id);
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

  // const uploadImages = async (e) => {
  //   const files = e.target?.files;
  //   if (files?.length > 0) {
  //     const data = new FormData();

  //     for (const file of files) {
  //       data.append("file", file);
  //     }
  //   }
  // };

  const handleRemoveImage = (imageUrl) => {
    if (imageUrl.includes("blob")) {
      formData.delete(imageUrl);
    }

    setDeletedImages(deletedImages.concat(imageUrl));
    // setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
    setPreviewImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );
  };

  const updatePreviewImagesOrder = (images) => {
    setPreviewImages(images);
  };

  return (
    <div className="flex flex-row w-full h-full gap-10 mt-4 mb-12">
      <section className="w-[80%] flex flex-col ">
        <h1 className="text-left text-[42px]">
          {_id ? "Edit property" : "New property"}
        </h1>
        <div className="bg-white w-full flex p-4 shadow-md">
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
            <div className="flex w-full justify-between mt-8">
              <Link
                href={_id ? "/real-estate/property/" + _id : "/real-estate"}
                className="primary-button alternative-red-button  "
              >
                Cancel
              </Link>
              <button type="submit" className="primary-button red-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="w-[20%] flex flex-col ">
        <h1 className="text-left text-[42px]">Preview</h1>
        <PropertyCard {...values} coverImage={previewImages[0]} />
      </section>
    </div>
  );
};

export default PropertyForm;
