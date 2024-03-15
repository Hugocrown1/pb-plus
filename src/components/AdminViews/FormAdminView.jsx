import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconX,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";

const FormAdminView = ({ formId, onClose }) => {
  const [formData, setFormData] = useState(formId);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "+52" + formData.userPhone;

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
    } catch (error) {
      console.error("Failed to delete remo:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    handleDelete(formData._id);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="fixed top-0 z-50 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col relative w-[600px] bg-white rounded-xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-800 hover:bg-gray-200 hover:text-gray-800 rounded-full p-1 items-end"
        >
          <IconX></IconX>
        </button>
        <div className="p-8">
          <h2 className="text-xl font-bold mb-4">{formData.serviceName}</h2>

          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold mb-2">Contact Info:</h3>
            <p className="mb-2">Name: {formData.userName}</p>
            <p className="mb-2">Phone: {formData.userPhone}</p>
            <p className="mb-2">Email: {formData.userEmail}</p>
            <p className="mb-2">
              Date: {new Date(formData.date).toLocaleString()}
            </p>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold mb-2">Consultation:</h3>
            <p className="mb-2">Message: {formData.message}</p>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold mb-2">Contact Client:</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center text-green-500"
              >
                <IconBrandWhatsapp></IconBrandWhatsapp>
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center text-blue-500"
              >
                <IconMail></IconMail>
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <button
            className="bg-red-500 mx-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center "
            onClick={() => {
              setShowDeleteConfirmation(true);
            }}
          >
            <IconX/>Delete
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>Are you sure you want to delete?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
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

export default FormAdminView;
