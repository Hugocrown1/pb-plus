"use client";

import FormInput from "@/components/FormInput";
import PropertyCard from "@/components/PropertyCard";
import React, { useState } from "react";

const page = () => {
  const [values, setValues] = useState({
    title: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
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
      <div className="container-xl ">
        <div className="flex flex-row w-full h-full gap-10 mt-4 mb-12">
          <section className="w-[80%] flex flex-col ">
            <h1 className="text-left text-[42px]">New property</h1>
            <div className="bg-white w-full flex p-4 shadow-md">
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
                {/* <FormInput
                  label="Rental or selling"
                  name="type"
                  id="type"
                  placeholder={"Choose a type"}
                  value={values.type}
                  onChange={onChange}
                /> */}
                <div className="form-input">
                  <label htmlFor="type">Rental or selling</label>
                  <select
                    name="type"
                    id="type"
                    defaultValue={""}
                    onChange={onChange}
                  >
                    <option disabled value={""}>
                      Choose a type
                    </option>
                    <option value={"Rental"}>Rental</option>
                    <option value={"Selling"}>Selling</option>
                  </select>
                </div>
                <hr className="stroke-slate-600 my-4" />
                <h3>Property details</h3>
                <FormInput
                  type="number"
                  label="Bedrooms"
                  name="bedrooms"
                  id="bedrooms"
                  placeholder={"Number of bedrooms"}
                  errorMessage="Please enter a valid number"
                  pattern="^[0-9]{1-6}"
                  value={values.bedrooms}
                  onChange={onChange}
                />

                <FormInput
                  type="number"
                  label="Bathrooms"
                  name="bathrooms"
                  id="bathrooms"
                  errorMessage="Please enter a valid number"
                  placeholder={"Number of bathrooms"}
                  value={values.bathrooms}
                  onChange={onChange}
                />
                <FormInput
                  label="Address"
                  name="address"
                  id="address"
                  placeholder={"Property address"}
                  value={values.address}
                  onChange={onChange}
                />
                <div className="form-input">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Property description"
                    value={values.description}
                    onChange={onChange}
                  ></textarea>
                </div>

                <FormInput
                  type="number"
                  label="Price"
                  name="price"
                  id="price"
                  errorMessage="Please enter a valid number"
                  placeholder={"Price"}
                  value={values.price}
                  onChange={onChange}
                />
                <div className="flex w-full justify-between mt-8">
                  <button className="primary-button alternative-red-button">
                    Cancel
                  </button>
                  <button type="submit" className="primary-button red-button">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section className="w-[20%] flex flex-col ">
            <h1 className="text-left text-[42px]">Preview</h1>
            <PropertyCard {...values} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
