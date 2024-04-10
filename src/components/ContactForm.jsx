"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";

const ContactForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
    serviceName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData({
        userName: session.user.name || "",
        userEmail: session.user.email || "",
        userPhone: session.user.phone || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    if (typeof e === "string") {
      // If e is a string, it's coming from PhoneInput
      setFormData((prevData) => ({
        ...prevData,
        userPhone: e, // Set the phone number directly
      }));
    } else {
      const { name, value } = e.target;

      // Validación del teléfono
      if (name === "userPhone") {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setPhoneError(false); // Reiniciar el estado del error al escribir
      }
      // Validación del correo electrónico
      else if (name === "userEmail") {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setEmailError(false); // Reiniciar el estado del error al escribir
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validación del correo electrónico
    if (name === "userEmail") {
      if (value === "" || /^\S+@\S+\.\S+$/.test(value)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
    // Validación del teléfono (opcional)
    if (name === "userPhone") {
      if (value === "" || /^\d{10,}$/.test(value)) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const currentDate = new Date().toISOString();
      const formDataWithDate = { ...formData, date: currentDate };
      await axios.post("/api/consultations", formDataWithDate);
      toast.success("Consultation submitted!");
      setFormData({
        userName: "",
        userEmail: "",
        userPhone: "",
        message: "",
        serviceName: "",
      });
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Consultation failed!");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const validatePhone = (phone) => {
    if (phone.match(/^1\d{10}$/) || phone.match(/^52\d{10}$/)) {
      return true;
    }
    return false;
  };

  return (
    <section
      id="contactus"
      className="w-full flex flex-col justify-center p-4 bg-gray-200"
    >
      <div className="w-full flex flex-col justify-center xl:w-[1100px] xl:mx-auto xl:my-16 xl:flex-row">
        <div className="w-full text-start">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-xl xl:text-3xl pb-8 font-semibold">Contact Us</p>
          <p className="text-[#5e5e5e]  text-sm xl:text-lg  mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!validatePhone(formData.userPhone)) {
                toast.error("Invalid phone number");

                return;
              }
              handleSubmit();
            }}
            className="rounded-md"
          >
            <label htmlFor="userName" className="block text-gray-800 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
            />

            <label
              htmlFor="userEmail"
              className="block text-gray-800  mt-4 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              onBlur={handleBlur} // Activar la verificación de error al salir del campo
              required
              className={`w-full p-2 border rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500">Please provide your email</p>
            )}

            <label
              htmlFor="userPhone"
              className="block text-gray-800 mt-4 mb-2"
            >
              Phone:
            </label>
            <PhoneInput
              inputProps={{
                name: "userPhone",
                required: true,
                autoFocus: true,
              }}
              country={"mx"}
              onlyCountries={["mx", "us"]}
              value={formData.userPhone}
              onChange={handleChange}
              placeholder="+52 123 456 78 90"
              inputStyle={{
                width: "100%",
                height: "42px",
                fontSize: "18px",
                fontFamily: "normal",
              }}
            />

            <label
              htmlFor="serviceName"
              className="block text-gray-800 mt-4 mb-2"
            >
              Service:
            </label>
            <select
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>
                Choose the service
              </option>
              <option value="Immigration Services">Immigration Services</option>
              <option value="Property Regularization">
                Property Regularization
              </option>
              <option value="Property Acquisition">Property Acquisition</option>
              <option value="Court Representation">Court Representation</option>
              <option value="Legal Consulting">Legal Consulting</option>
              <option value="Formation Of Companies">
                Formation Of Companies
              </option>
              <option value="Funeral Arrangements">Funeral Arrangements</option>
              <option value="Other Legal Services">Other Legal Services</option>
            </select>

            <label htmlFor="message" className="block text-gray-800 mt-4 mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            ></textarea>

            <button
              type="submit"
              className="my-1 px-4 py-2 rounded-[10px] font-medium text-lg w-[220px] text-[#FCFFFC] transition-colors bg-[#cba557] hover:bg-[#c29029] text-center relative"
              disabled={loading}
            >
              {loading && (
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              )}
              {!loading && "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
