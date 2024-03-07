"use client";

import { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="form-input">
      <label className="text-base" htmlFor={inputProps.id}>
        {label}
      </label>
      <input
        className="text-lg"
        {...inputProps}
        onChange={onChange}
        required
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
