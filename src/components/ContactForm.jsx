import React from "react";

const ContactForm = ({ onSubmit }) => {
  return (
    <section
      id="contactus"
      className="w-full flex flex-col justify-center p-4 bg-gray-200 "
    >
      <div className="w-full  flex flex-col justify-center xl:w-[1100px] xl:mx-auto xl:my-16 xl:flex-row">
        <div className="w-full text-start">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-xl xl:text-3xl pb-8 font-semibold">Contact Us</p>

          <p className="text-[#5e5e5e]  text-sm xl:text-lg  mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="w-full">
          <form action="/enviar-consulta" method="post" className="rounded-md">
            <label htmlFor="nombre" className="block text-gray-800   mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="w-full p-2 border rounded-md"
            />

            <label htmlFor="correo" className="block text-gray-800  mt-4 mb-2">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              required
              className="w-full p-2 border rounded-md"
            />

            <label
              htmlFor="telefono"
              className="block text-gray-800   mt-4 mb-2"
            >
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="w-full p-2 border rounded-md"
            />

            <label
              htmlFor="mensaje"
              className="block text-gray-800   mt-4 mb-2"
            >
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="4"
              required
              className="w-full p-2 border rounded-md"
            ></textarea>

            <button
              type="submit"
              className="my-1 px-4 py-2 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
            >
              Enviar Consulta
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
