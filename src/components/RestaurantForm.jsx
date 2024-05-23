"use client";

import FormInput from "@/components/FormInput";
import { useState } from "react";
import Link from "next/link";
import FormFileInput from "./FormFileInput";

const RestaurantForm = ({
  values,
  previewImages,
  onChange,
  uploadPreviewImage,
  setShowInitialForm,
  setValues,
  isFormOpen,
  _id,
}) => {
  const [activeSocialMedia, setActiveSocialMedia] = useState({});

  const handleCheckboxChange = (socialMediaName) => {
    setActiveSocialMedia((prev) => ({
      ...prev,
      [socialMediaName]: !prev[socialMediaName],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInitialForm(false);
  };

  return (
    <div
      className={`pt-[50px] fixed z-40 w-full h-full bg-zinc-950/30 ${
        !isFormOpen && "invisible"
      }`}
    >
      <div className="flex flex-col xl:flex-row w-full gap-10 my-5 justify-center ">
        <section className="w-1/2 flex flex-col mt-4 bg-[#f5f3f4] p-5 rounded-md">
          <h1 className="text-left text-[42px]">
            {_id ? "Edit restaurant" : "New restaurant"}
          </h1>
          <div className="bg-white w-full flex p-4 shadow-md rounded-xl">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 w-full gap-5"
            >
              <div>
                <h3>Basic information</h3>
                <FormInput
                  label="Restaurant name"
                  name="name"
                  id="name"
                  maxLength="100"
                  placeholder={"Name"}
                  value={values.name}
                  onChange={onChange}
                  errorMessage="Please provide a name"
                />
                <label htmlFor="profileImage">Restaurant Image</label>
                <div className=" h-[360px] relative rounded-md overflow-hidden bg-[#f5f3f4]">
                  <FormFileInput
                    alt={"Restaurant profile image"}
                    id={"profileImage"}
                    inputColor={"#E7E1E4"}
                    name={"Profile"}
                    onChange={uploadPreviewImage}
                    url={previewImages.Profile}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="type">Restaurant category</label>
                  <select
                    name="category"
                    id="category"
                    defaultValue={values.category}
                    onChange={onChange}
                    required
                  >
                    <option disabled value={""}>
                      Choose a category
                    </option>
                    <option value={"Restaurant"}>Restaurant</option>
                    <option value={"Bar"}>Bar</option>
                    <option value={"Shop"}>Shop</option>
                    <option value={"Other"}>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <h3>Restaurant details</h3>
                <FormInput
                  label="Address"
                  name="address"
                  id="address"
                  placeholder={"Restaurant address"}
                  value={values.address}
                  onChange={onChange}
                  errorMessage="Please provide an address"
                />
                <hr className="stroke-slate-600 my-4" />
                <h3>Social medias</h3>
                {Object.entries(values.socialMedia).map(
                  ([socialMediaName, socialMediaValue]) => (
                    <div key={socialMediaName}>
                      <label
                        htmlFor={`${socialMediaName}-checkbox`}
                        className="ml-2"
                      >
                        {socialMediaName}
                      </label>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id={`${socialMediaName}-checkbox`}
                          checked={activeSocialMedia[socialMediaName] || false}
                          className="mr-2 my-1 w-[10%] h-6"
                          onChange={() => handleCheckboxChange(socialMediaName)}
                        />
                        <div className="w-full">
                        <FormInput
                          className="disabled:opacity-50"
                          disabled={!activeSocialMedia[socialMediaName]}
                          label=""
                          name={socialMediaName}
                          id={socialMediaName}
                          placeholder={`${socialMediaName} URL`}
                          value={socialMediaValue}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              socialMedia: {
                                ...values.socialMedia,
                                [socialMediaName]: e.target.value,
                              },
                            })
                          }
                        />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex w-full justify-between items-end mt-2 col-span-2">
                <Link
                  href={
                    _id
                      ? "/community/advertising/" + _id
                      : "/community/advertising"
                  }
                  className="community-button-outline"
                >
                  Cancel
                </Link>
                <button type="submit" className="community-button">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantForm;
