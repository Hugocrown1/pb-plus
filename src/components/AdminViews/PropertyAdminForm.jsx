"use client";
import FormInput from "@/components/FormInput";
import PropertyCard from "@/components/PropertyCard";
import { IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { deleteImage } from "@/lib/deleteImage";
import { ReactSortable } from "react-sortablejs";
import { toast } from "sonner";


const PropertyAdminForm = ({
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
  onClose,
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

  const [previewImages, setPreviewImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(new FormData());
  const [deletedImages, setDeletedImages] = useState([]);

  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const saveProperty = async () => {
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

      onClose();
      toast.success("Property updated successfully!");
    } else {
      await axios.put("/api/properties/" + _id, {
        ...values,
        coverImage: propertyImages[0],
        images: propertyImages,
      });
      onClose();
      toast.success("Property updated successfully!");
    }
  };

  const deleteProperty = async () => {
    await axios.delete("/api/properties/" + _id);
    onClose();
    toast.info("Property deleted successfully!");
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

  const handleUpdateConfirmation = () => {
    saveProperty();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    deleteProperty();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

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
            className="xl:w-2/3"
          >
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
                      className={`flex relative h-20 w-20 rounded-md m-1 shadow-lg justify-end bg-transparent items-start overflow-hidden`}
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
                className="flex flex-col items-center m-1 justify-center w-20 h-20 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
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
            <hr className="stroke-slate-600 my-2" />
            <h3>Property details</h3>
            <div className="flex gap-2">
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
            </div>
            <div className="flex gap-2">
              <div className="form-input w-1/3">
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
              <div className="w-2/3">
                <FormInput
                  label="Address"
                  name="address"
                  id="address"
                  placeholder={"Property address"}
                  value={values.address}
                  onChange={onChange}
                  errorMessage="Please provide an address"
                />
              </div>
            </div>
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

          <div className="">
            <h3>Preview</h3>
            <div className="h-fit border-2 border-gray-100 rounded-md">
              <PropertyCard {...values} coverImage={previewImages[0]} />
            </div>
          </div>
        </section>
      </div>
      {/* Update Confirmation Modal */}
      {showUpdateConfirmation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="w-full border-b-2 mb-8 text-sm font-semibold">
              Update Property
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
              Delete Property
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

export default PropertyAdminForm;
