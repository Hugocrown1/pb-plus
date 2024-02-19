"use client";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const deleteProperty = async () => {
    await axios.delete("/api/properties/" + id);
    router.push("/real-estate/houses-&-properties");
  };
  return (
    <button onClick={deleteProperty} className="real-estate-button-outline">
      <IconTrash />
      <p>Delete</p>
    </button>
  );
};

export default DeleteButton;
