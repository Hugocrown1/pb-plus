"use client";
import EventCard from "./EventCard";

import { useEffect, useState } from "react";
import axios from "axios";
import CardsLoader from "./CardsLoader";

// const getEvents = () => {
//   await connectDB();
//   const response = await Events.find().lean();

//   return response;
// };

const EventsDisplay = ({ user }) => {
  // const events = await getEvents();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <>
      {!events && <CardsLoader />}
      <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
        {events?.map((event) => (
          <EventCard key={event._id} userSession={user} {...event} />
        ))}
      </div>
    </>
  );
};

export default EventsDisplay;
