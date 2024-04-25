"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEventsStore } from "@/store/eventsStore";
import { useModalStore } from "@/store/modalStore";

const InterestedUserButton = ({ event, userSession }) => {
  const { events, setEvents } = useEventsStore();
  const { setShowModal } = useModalStore();

  const [interested, setInterested] = useState(
    event.interested.includes(userSession?.id)
  );

  useEffect(() => {
    if (!userSession || !event) return;

    const EventInStore = events.find((e) => e._id === event._id);

    if (!EventInStore) {
      setEvents([...events, event]);
    } else {
      setInterested(EventInStore.interested.includes(userSession.id));
    }
  }, [event, userSession, events, setEvents]);

  const handleInterestedUser = async (e, eventId) => {
    e.stopPropagation();
    e.preventDefault();

    if (!userSession) {
      setShowModal(true);
      return;
    }

    let newEvent;

    try {
      if (!interested) {
        const response = await axios.post("/api/interested-user", {
          eventId,
        });

        newEvent = response.data;

        toast.success("You're interested in this event!");
      } else {
        const response = await axios.delete(
          `/api/interested-user?eventId=${eventId}`
        );

        newEvent = response.data;
        toast.success("You're no longer interested in this event!");
      }
      const newEvents = events.filter((e) => e._id !== newEvent._id);

      setEvents([...newEvents, newEvent]);

      setInterested(!interested);
    } catch (error) {
      if (error.response.data.message === "User already interested") {
        setInterested(true);
        return;
      }
      console.error("Error posting interested user:", error);
    }
  };

  return (
    <>
      <button
        onClick={(e) => handleInterestedUser(e, event._id)}
        className={` flex w-full max-h-24  items-center justify-center gap-x-2 ${
          interested
            ? "bg-[#0077b6] text-[#B9E7FE]"
            : "bg-[#B9E7FE] text-[#0077b6]"
        } font-semibold  py-2 rounded-lg 
         hover:opacity-80
       transition-all duration-300 ease-in-out "`}
      >
        {interested ? <IconHeartFilled /> : <IconHeart />}{" "}
        {interested ? "You're interested" : "I'm interested"}
      </button>
    </>
  );
};

export default InterestedUserButton;