"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconX, IconPhotoEdit } from "@tabler/icons-react";
import EditButton from "./EditButton";
import { useSession } from "next-auth/react";

const UserEditForm = () => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const defaultImage = "/assets/defaultprofile.jpg";
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;
        setUserData(user);
      } catch (error) {
        setError("Failed to fetch user data");
      }
      setLoading(false);
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let updatedUserData = { ...userData };
      if (image) {
        const imageUrl = await uploadImage(image);
        updatedUserData.image = imageUrl;
      }

      await axios.put(`/api/users/${userId}`, updatedUserData);
      setShowEditForm(false);
    } catch (error) {
      setError("Failed to update user");
    }
    setLoading(false);
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
  };

  return (
    <>
      <EditButton onClick={() => setShowEditForm(true)} />
      {showEditForm && (
        <div className="fixed top-0  z-50 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          {loading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            </div>
          )}
          <div className="bg-white p-6 rounded-md shadow-lg w-[50vh] flex flex-col items-end">
            <button
              onClick={() => setShowEditForm(false)}
              className="text-black hover:bg-red-400 hover:text-white rounded-full p-1"
            >
              <IconX></IconX>
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowUpdateConfirmation(true);
              }}
              className="space-y-4"
            >
              <input type="hidden" name="id" value={userId} />
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="relative inline-block">
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : userData.image
                        ? userData.image
                        : defaultImage
                    }
                    alt="Profile"
                    className="h-44 w-44 rounded-xl border-4 border-gray-200"
                    onClick={() => document.getElementById("image").click()}
                    title="Edit"
                  />
                  <div
                    onClick={() => document.getElementById("image").click()}
                    className="absolute inset-0 flex items-center justify-center w-full h-full opacity-0 hover:opacity-50 bg-black text-white rounded-xl cursor-pointer"
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-100 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-100 text-gray-900 "
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-100 text-gray-900 "
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-200 text-blue-500 hover:text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
                >
                  Update
                </button>
              </div>
            </form>
            {error && <p>{error}</p>}
          </div>
          {/* Update Confirmation Modal */}
          {showUpdateConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
                <p>Are you sure you want to update?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setShowUpdateConfirmation(false);
                    }}
                    className="bg-gray-200 text-gray-500 hover:text-white hover:bg-gray-500 px-4 py-2 mr-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateConfirmation}
                    className="bg-red-200 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserEditForm;
