import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconX, IconPhotoEdit } from "@tabler/icons-react";

const UserAdminForm = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;
        setUserData(user);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchData();
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
    try {
      let updatedUserData = { ...userData };
      if (image) {
        const imageUrl = await uploadImage(image);
        updatedUserData.image = imageUrl;
      }

      await axios.put(`/api/users/${userId}`, updatedUserData);
      onClose();
    } catch (error) {
      setError("Failed to update user");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      onClose();
    } catch (error) {
      setError("Failed to delete user");
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
  };

  const handleDeleteConfirmation = () => {
    handleDelete();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="fixed top-0  z-50 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[50vh] flex flex-col items-end">
        <button
          onClick={onClose}
          className="text-blue-600 hover:bg-gray-200 hover:text-gray-800 rounded-full p-1"
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
                    : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                }
                alt="Profile"
                className="h-44 w-44 rounded-full"
                onClick={() => document.getElementById("image").click()}
                title="Edit"
              />
              <div
                onClick={() => document.getElementById("image").click()}
                className="absolute inset-0 flex items-center justify-center w-full h-full opacity-0 hover:opacity-50 bg-black text-white rounded-full cursor-pointer"
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
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={userData.role || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            >
              <option value="" disabled hidden>
                Selecciona una opción
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
    </div>
  );
};

export default UserAdminForm;
