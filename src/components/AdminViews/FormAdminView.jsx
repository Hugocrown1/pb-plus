import React, { useState } from "react";
import axios from "axios";
import { IconX, IconTrash, IconBrandWhatsapp, IconMail, IconUser, IconMessage, IconMessages } from "@tabler/icons-react";
import { toast } from "sonner";

const FormAdminView = ({ formId, onClose }) => {
  const [formData, setFormData] = useState(formId);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "+" + formData.userPhone;

    const message = `Hola, estoy en contacto contigo a través de PB Plus. Para tu consulta sobre ${formData.serviceName}.`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const handleEmailClick = () => {
    const email = formData.userEmail;

    const subject = "PB Plus:" + formData.serviceName;

    const body = "Hola, estoy en contacto contigo a través de PB Plus.";

    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoURL, "_blank");
  };

  const handleDelete = async (formId) => {
    try {
      await axios.delete(`/api/consultations/${formId}`);
      onClose();
      toast.info("Legal Form deleted successfully!");
    } catch (error) {
      console.error("Failed to delete remo:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    handleDelete(formData._id);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="fixed top-0 z-50 left-0 w-full h-full flex justify-center items-center overflow-y-auto">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded-md shadow-lg w-full xl:w-[25%] max-w-screen-md mx-4 z-50">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">{formData.serviceName}</p>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold bg-gray-200 hover:text-black rounded-md"
          >
            <IconX size={30}></IconX>
          </button>
        </div>
        <div className="border-t border-gray-300 pt-4 my-2"></div>
        <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
          <p className="text-base font-semibold mb-2 flex gap-1 text-gray-800">
            <IconUser />
            Client Info
          </p>
          <div className="border  border-gray-200 rounded-md px-2 mb-4">
            <p className="mb-2"> {formData.userName}</p>
            <p className="mb-2"> {formData.userPhone}</p>
            <p className="mb-2"> {formData.userEmail}</p>
            <p className="mb-2">{new Date(formData.date).toLocaleString()}</p>
          </div>
          <p className="text-base font-semibold mb-2 flex gap-1 text-gray-800">
            <IconMessage /> Message
          </p>
          <p className="mb-2 flex  border border-gray-200 rounded-md px-2">
            {formData.message}
          </p>

          <div className=" pt-4">
            <h3 className="text-base font-semibold mb-2 flex text-gray-800">
              <IconMessages />
              Contact Client
            </h3>
            <div className="flex space-x-4 mb-2">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center text-green-500 bg-green-100 rounded-md p-1 hover:bg-green-500 hover:text-white"
              >
                <IconBrandWhatsapp></IconBrandWhatsapp>
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center text-blue-500 bg-blue-100 rounded-md p-1 hover:bg-blue-500 hover:text-white"
              >
                <IconMail></IconMail>
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center border-t border-gray-300">
        <button
            className="my-1 flex justify-center bg-[#e00202] hover:bg-red-800 text-white hover:text-white px-4 py-2 rounded-md w-1/3 border border-gray-300 transition-colors duration-300 ease-in-out"
            onClick={() => {
              setShowDeleteConfirmation(true);
            }}
          >
            <IconTrash />
            Delete
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="w-full border-b-2 mb-8 text-sm font-semibold">
              Delete Legal Form
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

export default FormAdminView;
