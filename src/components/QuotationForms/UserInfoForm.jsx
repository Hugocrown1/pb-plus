import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "../FormInput";

const UserInfoForm = ({ userData, changeUserData }) => {
  return (
    <FormWrapper title={"Please provide us your contact information"}>
      <div className="form-input">
        <FormInput
          label="Name"
          name="name"
          id="name"
          value={userData.name}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please provide your name"
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please provide your email"
        />
        <FormInput
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          value={userData.phone}
          onChange={(e) => changeUserData(e)}
          errorMessage="Please provide your phone number"
        />
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
