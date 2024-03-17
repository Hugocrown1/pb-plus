import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconX, IconPhotoEdit } from "@tabler/icons-react";
import PropertyCard from "@/components/PropertyCard";
import { ReactSortable } from "react-sortablejs";

const PropertyAdminForm = ({ propertyId, onClose }) => {
  const [propertyData, setPropertyData] = useState({});
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}`);
        const property = response.data;
        setPropertyData(property);
      } catch (error) {
        setError("Failed to fetch property data");
      }
    };

    fetchData();
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const previewImageUrl = URL.createObjectURL(file); // Obtener la URL de previsualización de la nueva imagen
    setPreviewImage(previewImageUrl); // Actualizar el estado de la previsualización con la nueva URL
  };

  const handleUpdate = async () => {
    try {
      let updatedPropertyData = { ...propertyData };
      if (image) {
        const imageUrl = await uploadImage(image);
        updatedPropertyData.coverImage = imageUrl;
      }

      await axios.put(`/api/properties/${propertyId}`, updatedPropertyData);
      onClose();
    } catch (error) {
      setError("Failed to update property");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/properties/${propertyId}`);
      onClose();
    } catch (error) {
      setError("Failed to delete property");
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data[0].linkAws;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleUpdateConfirmation = () => {
    handleUpdate();
    setShowUpdateConfirmation(false);
                  setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    handleDelete();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

  

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col relative w-[1100px] bg-white">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-800 hover:bg-gray-200 hover:text-gray-800 rounded-full p-1 items-end"
        >
          <IconX></IconX>
        </button>
        <div className="flex">
          <div className="bg-white p-6 w-[60%] flex flex-col items-end">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowUpdateConfirmation(true);
              }}
              className="space-y-1"
            >
              <input type="hidden" name="id" value={propertyId} />
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="relative inline-block">
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : propertyData.coverImage
                        ? propertyData.coverImage
                        : "https://www.freevector.com/uploads/vector/preview/17867/FreeVector-House-Vector.jpg"
                    }
                    alt="Property"
                    className="h-44 w-44 rounded-md"
                    onClick={() => document.getElementById("image").click()}
                    title="Edit"
                  />
                  <div
                    onClick={() => document.getElementById("image").click()}
                    className="absolute inset-0 flex items-center justify-center w-full h-full opacity-0 hover:opacity-50 bg-black text-white rounded-md cursor-pointer"
                  >
                    <span className="text-lg font-bold">
                      <IconPhotoEdit size={60} />
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={propertyData.title || ""}
                  onChange={handleChange}
                  placeholder="Title"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  name="type"
                  id="role"
                  value={propertyData.type || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled hidden>
                    Choose a type
                  </option>
                  <option value="Rental">Rental</option>
                  <option value="Selling">Selling</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  value={propertyData.bedrooms || ""}
                  onChange={handleChange}
                  placeholder="Number of bedrooms"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms
                </label>
                <input
                  type="text"
                  name="bathrooms"
                  id="bathrooms"
                  value={propertyData.bathrooms || ""}
                  onChange={handleChange}
                  placeholder="Number of bathrooms"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="zone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zone
                </label>
                <select
                  name="zone"
                  id="zone"
                  value={propertyData.zone || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled hidden>
                    Choose the zone of the property
                  </option>
                  <option value="The Ejido">The Ejido</option>
                  <option value="Bufadora">Bufadora</option>
                  <option value="The Spit">The Spit</option>
                  <option value="Maneadero">Maneadero</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={propertyData.address || ""}
                  onChange={handleChange}
                  placeholder="Property address"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={propertyData.description || ""}
                  onChange={handleChange}
                  placeholder="Property description"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={propertyData.price || ""}
                  onChange={handleChange}
                  placeholder="Price"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </form>

            {error && <p>{error}</p>}
          </div>
          {/* Update Confirmation Modal */}
          {showUpdateConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <p>Are you sure you want to update?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setShowUpdateConfirmation(false);
                  setShowDeleteConfirmation(false);
                    }}
                    className="bg-gray-200 text-gray-600 px-4 py-2 mr-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateConfirmation}
                    className="bg-red-400 text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <p>Are you sure you want to delete?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setShowUpdateConfirmation(false);
                  setShowDeleteConfirmation(false);
                    }}
                    className="bg-gray-200 text-gray-600 px-4 py-2 mr-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirmation}
                    className="bg-red-400 text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          <section className="xl:w-[40%] w-full flex flex-col p-4">
            <h1 className="text-left text-[26px]">Preview</h1>
            <div className=" xl:h-full w-1/2 xl:w-full xl:self-center">
              <PropertyCard
                {...propertyData}
                coverImage={
                  previewImage ? previewImage : propertyData.coverImage
                }
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropertyAdminForm;
