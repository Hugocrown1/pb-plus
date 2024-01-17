"use client";

import FormInput from "@/components/FormInput";
import PropertyCard from "@/components/PropertyCard";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState(new FormData());

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const saveProperty = async (e) => {
    e.preventDefault();

    try {
      const responseFiles = await axios.post("/api/files", formData);

      setImages((prevImages) => [...prevImages, ...responseFiles.data]);

      const responseProperties = await axios.post("/api/properties", {
        ...values,
        images: responseFiles.data,
      });

      router.push("/real-estate");
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
    }
  };

  const uploadPreviewImages = (e) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      for (const file of files) {
        formData.append("file", file);
      }

      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(previewImages.concat(urls));
    }
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }
      console.log(data.get("file"));

      // const response = await axios.post("/api/files", data);

      // setImages((oldImages) => {
      //   return [...oldImages, response.data];
      // });
    }
  };

  return (
    <main className="bg-[#f5f3f4]">
      <div className="container-xl ">
        <div className="flex flex-row w-full h-full gap-10 mt-4 mb-12">
          <section className="w-[80%] flex flex-col ">
            <h1 className="text-left text-[42px]">New property</h1>
            <div className="bg-white w-full flex p-4 shadow-md">
              <form onSubmit={saveProperty}>
                <h3>Basic information</h3>
                <FormInput
                  label="Property title"
                  name="title"
                  id="title"
                  placeholder={"Title"}
                  value={values.title}
                  onChange={onChange}
                  errorMessage="Please provide a title"
                />
                <label htmlFor="photos">Photos</label>
                <div className="flex flex-wrap">
                  {!!previewImages?.length &&
                    previewImages.map((link, index) => (
                      <div
                        key={index}
                        className={`flex relative h-24 w-24 rounded-md m-1 shadow-lg justify-center bg-transparent items-center overflow-hidden`}
                      >
                        <Image
                          src={link}
                          alt="Property photo"
                          fill={true}
                          sizes="(min-width: 1120px) 248px"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    ))}

                  {/* {!!images?.length &&
                    images.map((link, index) => (
                      <div
                        key={index}
                        className={`flex relative h-24 w-24 rounded-md m-1 shadow-lg justify-center bg-transparent items-center overflow-hidden`}
                      >
                        <Image
                          src={link}
                          alt="Property photo"
                          fill={true}
                          sizes="(min-width: 1120px) 248px"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    ))} */}
                  <label
                    htmlFor="photos"
                    className="flex flex-col items-center m-1 justify-center w-24 h-24 bg-[#f5f3f4] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer"
                  >
                    <IconUpload size={22} />
                    Cargar
                    <input
                      id="photos"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={uploadPreviewImages}
                    />
                  </label>
                </div>

                <div className="form-input">
                  <label htmlFor="type">Rental or selling</label>
                  <select
                    name="type"
                    id="type"
                    defaultValue={""}
                    onChange={onChange}
                    required
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
                  errorMessage="Please provide an address"
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
                  <Link
                    href={"/real-estate"}
                    className="primary-button alternative-red-button  "
                  >
                    Cancel
                  </Link>
                  <button type="submit" className="primary-button red-button">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section className="w-[20%] flex flex-col ">
            <h1 className="text-left text-[42px]">Preview</h1>
            <PropertyCard {...values} coverImage={previewImages[0]} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
