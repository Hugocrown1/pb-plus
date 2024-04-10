import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconX, IconPhotoEdit } from "@tabler/icons-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { toast } from "sonner";

const UserAdminForm = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;
        setUserData(user);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    if (typeof e === "string") {
      // If e is a string, it's coming from PhoneInput
      setUserData((prevData) => ({
        ...prevData,
        phone: e, // Set the phone number directly
      }));
    } else {
      // Otherwise, it's a regular input event
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      toast.success("User updated successfully!");
    } catch (error) {
      setError("Failed to update user");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      onClose();
      toast.info("User deleted successfully!");
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
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    handleDelete();
    setShowUpdateConfirmation(false);
    setShowDeleteConfirmation(false);
  };

  const validateEmail = (email) => {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    if (phone.match(/^1\d{10}$/) || phone.match(/^52\d{10}$/)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full  flex justify-center items-center pt-8 xl:pt-0">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40"
        onClick={onClose}
      ></div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="xl:w-fit w-full mx-4 z-50">
          <div className="bg-white p-4 rounded-md shadow-lg  xl:w-[50vh] flex flex-col w-full ">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Edit user</p>
              <button
                onClick={onClose}
                className="text-gray-500 font-bold bg-gray-200 hover:text-black rounded-md"
              >
                <IconX size={30} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!validateEmail(userData.email)) {
                  toast.error("Invalid email address");
                  setError("Invalid email address");
                  return;
                }
                if (!validatePhone(userData.phone)) {
                  toast.error("Invalid phone number");
                  setError("Invalid phone number");
                  return;
                }
                setShowUpdateConfirmation(true);
              }}
              className="space-y-1 xl:space-y-4"
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              <input type="hidden" name="id" value={userId} />

              <div className="w-full h-[2px] bg-gray-200"></div>
              <p className="font-semibold w-full text-base">Basic Information</p>
              <p className="text-sm font-medium text-gray-700">Profile photo</p>
              <div className="flex justify-center items-center space-x-4 mb-4 ">
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
                    className="h-44 w-44 rounded-full "
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className="mt-1 py-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-opacity-50"
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
                  className="mt-1 py-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-opacity-50"
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
                <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  country={"mx"}
                  onlyCountries={["mx", "us"]}
                  value={userData.phone || ""}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  inputStyle={{
                    width: "100%",
                    height: "38px",
                    background: "#F3F4F6",
                  }}
                />
              </div>

              <div className="w-full h-[2px] bg-gray-200"></div>
              <p className="font-semibold w-full text-base">Admin Privileges</p>

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
                  className="mt-1 py-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-opacity-50"
                  required
                >
                  <option value="" disabled hidden>
                    Selecciona una opción
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-between gap-8">
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

            {/* {error && <p className="bg-red-400 rounded-md text-white text-center my-2 py-2">{error}</p>} */}
          </div>
          {/* Update Confirmation Modal */}
          {showUpdateConfirmation && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <p className="w-full border-b-2 mb-8 text-sm font-semibold">
                  Update User
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
                  Delete User
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
      )}
    </div>
  );
};

export default UserAdminForm;
