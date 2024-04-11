"use client";
import React from "react";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="primary-button hover:bg-gray-500/10 transition-colors"
    >
      Edit Profile
    </button>
  );
};

export default EditButton;
