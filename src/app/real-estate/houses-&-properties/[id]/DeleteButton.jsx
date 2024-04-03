"use client";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const DeleteButton = ({ id }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);

  const router = useRouter();
  const deleteProperty = async () => {
    await axios.delete("/api/properties/" + id);
    router.push("/real-estate/houses-&-properties");
  };

  return (
    <>
      <button
        onClick={() => setConfirmationModal(true)}
        className="real-estate-button-outline"
      >
        <IconTrash />
        <p>Delete</p>
      </button>
      <div
        className={`fixed flex items-center inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
          !confirmationModal && "invisible"
        } `}
      >
        <dialog className="flex flex-col justify-evenly w-full  max-w-[600px] items-center h-[300px] bg-white rounded-lg px-6 py-[30px]">
          <h2 className="text-2xl font-semibold">
            Are you sure you want to delete this property?
          </h2>
          <div className="w-full flex flex-col min-[505px]:flex-row gap-x-4 gap-y-2 justify-center items-center">
            <button
              className="real-estate-button"
              onClick={() => setConfirmationModal(false)}
            >
              Cancel
            </button>
            <button
              className="real-estate-button-outline"
              onClick={deleteProperty}
            >
              Delete property
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default DeleteButton;
