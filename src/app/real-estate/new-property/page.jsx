"use client";

import FormInput from "@/components/FormInput";
import React, { useState } from "react";

const page = () => {
  const [values, setValues] = useState({
    title: "",
    type: "",
    address: "",
    description: "",
    price: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="bg-[#f5f3f4]">
      <div className="container-xl h-[800px]">
        <div className="flex flex-row w-full h-full gap-10 mt-4 mb-6">
          <section className="w-[80%] flex flex-col ">
            <h1 className="text-left text-[48px]">New property</h1>
            <div className="bg-white w-full flex p-4">
              <form onSubmit={handleSubmit}>
                <h3>Basic information</h3>
                <FormInput
                  label="Property title"
                  name="title"
                  id="title"
                  placeholder={"Title"}
                  value={values.title}
                  onChange={onChange}
                />
                <FormInput
                  label="Rental or selling"
                  name="type"
                  id="type"
                  placeholder={"Choose a type"}
                  value={values.type}
                  onChange={onChange}
                />
                <hr className="stroke-slate-600 my-4" />
                <h3>Property location</h3>
                <FormInput
                  label="Address"
                  name="address"
                  id="address"
                  placeholder={"Address"}
                  value={values.address}
                  onChange={onChange}
                />
                <FormInput
                  label="Description"
                  name="description"
                  id="description"
                  placeholder={"Description"}
                  value={values.description}
                  onChange={onChange}
                />
                <hr className="stroke-slate-600 my-4" />
                <h3>Price</h3>
                <FormInput
                  label="Price"
                  name="price"
                  id="price"
                  placeholder={"Price"}
                  value={values.price}
                  onChange={onChange}
                />
                <button className="primary-button alternative-red-button mt-8">
                  Submit
                </button>
              </form>
            </div>
          </section>
          <section className="w-[20%] flex flex-col ">
            <h1 className="text-left text-[48px]">Preview</h1>
            <div className="bg-white">preview</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
