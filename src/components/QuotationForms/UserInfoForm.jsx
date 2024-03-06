import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "../FormInput";

const UserInfoForm = ({ userInfo, setUserInfo }) => {
  return (
    <FormWrapper title={"Please provide us your contact information"}>
      <div className="form-input">
        <FormInput
          label="Name"
          name="name"
          id="name"
          //   value={values.title}
          //   onChange={onChange}
          errorMessage="Please provide your name"
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="email"
          //   value={values.title}
          //   onChange={onChange}
          errorMessage="Please provide your email"
        />
        <FormInput
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          //   value={values.title}
          //   onChange={onChange}
          errorMessage="Please provide your phone number"
        />
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
