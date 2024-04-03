"use client";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const deleteEvent = async () => {
    await axios.delete("/api/events/" + id);
    router.push("/community/events");
  };
  return (
    <button onClick={deleteEvent} className="events-button-outline">
      <IconTrash />
      <p>Delete</p>
    </button>
  );
};

export default DeleteButton;
