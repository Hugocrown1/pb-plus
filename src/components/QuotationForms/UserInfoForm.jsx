import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "../FormInput";

const UserInfoForm = ({ userData, changeUserData }) => {
  return (
    <FormWrapper title={"Please provide us your contact information"}>
      <div className="flex flex-col gap-2 form-input">
        <FormInput
          label="Name"
          name="name"
          id="name"
          value={userData.name}
          required
          minLength={3}
          maxLength={100}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please provide your name"
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="email"
          required
          maxLength={100}
          value={userData.email}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please provide your email"
        />
        <FormInput
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          maxLength={20}
          minLength={10}
          required
          value={userData.phone}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please a valid phone number"
        />
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
