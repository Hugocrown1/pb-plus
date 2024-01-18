import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  // Estados para almacenar los valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la función onSubmit pasada como prop con los datos del formulario
    onSubmit({ nombre, email, mensaje });
  };

  return (
    <section className="container-xl bg-white flex flex-row w-full h-full gap-10 mt-4 mb-12 p-8 rounded-lg shadow-md">
      <p className="font-bold text-2xl mb-2">Formulario de Contacto</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="nombre" className="mb-2">
          Nombre:
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>

        <label htmlFor="email" className="mb-2">
          Correo Electrónico:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>

        <label htmlFor="mensaje" className="mb-4">
          Mensaje:
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </label>

        <button
          type="submit"
          className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-[200px] transition-colors text-black border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C] self-center"
        >
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
