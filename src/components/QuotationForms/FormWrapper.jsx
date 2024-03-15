import React from "react";

const FormWrapper = ({ title, children }) => {
  return (
    <>
      <h2 className="text-xl min-[395px]:text-2xl text-center w-full mb-[40px]">
        {title}
      </h2>
      <div className="px-6">{children}</div>
    </>
  );
};

export default FormWrapper;
