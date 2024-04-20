"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const InterestedUserButton = ({ eventId, isUserInterested }) => {
  const [interested, setInterested] = useState(isUserInterested);

  const handleInterestedUser = async (e, eventId) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!interested) {
        await axios.post("/api/interested-user", {
          eventId,
        });
        toast.success("You're interested in this event!");
      } else {
        await axios.delete(`/api/interested-user?eventId=${eventId}`);
        toast.success("You're no longer interested in this event!");
      }

      setInterested(!interested);
    } catch (error) {
      console.error("Error posting interested user:", error);
    }
  };

  return (
    <button
      onClick={(e) => handleInterestedUser(e, eventId)}
      className={` flex w-full max-h-24  items-center justify-center gap-x-2 ${
        interested
          ? "bg-[#0077b6] text-[#B9E7FE]"
          : "bg-[#B9E7FE] text-[#0077b6]"
      } font-semibold mt-1  py-2 rounded-lg 
         hover:opacity-80
       transition-all duration-300 ease-in-out "`}
    >
      {interested ? <IconHeartFilled /> : <IconHeart />}{" "}
      {interested ? "You're interested" : "I'm interested"}
    </button>
  );
};

export default InterestedUserButton;
