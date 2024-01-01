"use client"
import React, { useState } from "react";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Age:", age);
    console.log("Address:", address);
    console.log("Phone:", phone);
  };

  return (
    <section className="flex items-center justify-center h-screen bg-black/10 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4">Sign in</h2>
        <form className="flex flex-col gap-4">
          <label className="text-xl" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="email">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="age">
            Edad:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="address">
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="phone">
            Teléfono:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <button
            type="button"
            onClick={handleRegister}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-full transition-colors bg-[#F6AA1C] text-black hover:bg-[#FFC65A] hover:border-[#F6AA1C]"
          >
            Sing In
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationPage;
