"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

const ContactFormRealEstate = ({ serviceName }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (session) {
      setUserData({
        userName: session.user.name || "",
        userEmail: session.user.email || "",
        userPhone: session.user.phone || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación del teléfono
    if (name === "userPhone") {
      setUserData((prev) => ({ ...prev, [name]: value }));
      setPhoneError(false); // Reiniciar el estado del error al escribir
    }
    // Validación del correo electrónico
    else if (name === "userEmail") {
      setUserData((prev) => ({ ...prev, [name]: value }));
      setEmailError(false); // Reiniciar el estado del error al escribir
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentDate = new Date().toISOString();
      const userDataWithDate = { ...userData, date: currentDate, serviceName };
      await axios.post("/api/pricing", userDataWithDate);
      console.log("Formulario enviado exitosamente");
      setUserData({
        userName: "",
        userEmail: "",
        userPhone: "",
        message: "",
      });
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000); // Ocultar mensaje de éxito después de 2 segundos
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000); // Ocultar mensaje de error después de 2 segundos
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="pricing"
      className="w-full flex flex-col justify-center p-4 bg-[#f5f3f4]"
    >
      <div className="w-full  flex flex-col justify-center xl:w-[1100px] xl:mx-auto xl:my-16 xl:flex-row">
        <div className="w-full text-start">
          <div className="w-[100px] h-1 bg-[#30725c] mb-4"></div>
          <p className="text-xl xl:text-3xl pb-8 font-semibold">Pricing</p>

          <p className="text-[#5e5e5e]  text-sm xl:text-lg  mb-4">
            Feel free to reach out to us by filling out the contact form
          </p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="rounded-md">
            <label htmlFor="userName" className="block text-gray-800 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
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
              value={userData.userEmail}
              onChange={handleChange}
              onBlur={handleBlur} // Activar la verificación de error al salir del campo
              required
              className={`w-full p-2 border rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
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
            <input
              type="tel"
              id="userPhone"
              name="userPhone"
              value={userData.userPhone}
              minLength={10}
              maxLength={20}
              onChange={handleChange}
              onKeyPress={(e) => {
                // Verificar si la tecla presionada es un número o un carácter especial
                const isNumber = /^[0-9\b]+$/.test(e.key);
                if (!isNumber) {
                  e.preventDefault(); // Prevenir la entrada del carácter si no es un número
                }
              }}
              onBlur={handleBlur} // Activar la verificación de error al salir del campo
              className={`w-full p-2 border rounded-md ${
                phoneError ? "border-red-500" : ""
              }`}
            />
            {phoneError && (
              <p className="text-red-500">Please a valid phone number</p>
            )}

            <label htmlFor="message" className="block text-gray-800 mt-4 mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={userData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            ></textarea>

            {error && (
              <p className="flex bg-red-200 p-1 my-2 rounded-md">
                An error occurred! <IconX color="red" />
              </p>
            )}
            {success && (
              <p className="flex bg-green-200 p-1 my-2 rounded-md">
                Successfully sent! <IconCheck color="green" />
              </p>
            )}

            <button
              type="submit"
              className="my-1 px-4 py-2 rounded-[10px] font-medium text-lg w-[220px] text-[#FCFFFC] transition-colors bg-[#30725c] hover:bg-[#40997b] text-center relative"
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

export default ContactFormRealEstate;
