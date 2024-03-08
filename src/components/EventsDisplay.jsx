"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyLoader from "./PropertyLoader";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFileSad,
} from "@tabler/icons-react";
import EventCard from "./EventCard";
import Link from "next/link";

const EventsDisplay = () => {
  // TODO: Refactorizar a server component

  const [value, setValue] = useState("recentlyAdded");
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterEvents = (filterValue, eventsList) => {
    let filteredProperties;
    if (filterValue === "recentlyAdded") {
      filteredProperties = eventsList;
    } else {
      filteredProperties = eventsList?.filter((property) =>
        property.zone.includes(filterValue)
      );
    }
    return filteredProperties;
  };

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => {
        const eventsData = res.data;
        setIsLoading(false);
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = filterEvents(value, events);
    setFilteredEvents(filtered);
  }, [value, events]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[2px] bg-[#aaaaaa49] mb-4"></div>
      <div className="grid grid-cols-5 gap-2 self-center">
        <Link
          href={""}
          className="px-4 py-3 rounded-2xl font-medium text-lg w-[190px]  transition-colors  bg-[#FCFFFC] hover:bg-[#0077b6] hover:text-white hover:border-white  border-black border  text-center"
        >
          Month
        </Link>
        <Link
          href={""}
          className="px-4 py-3 rounded-2xl font-medium text-lg w-[190px]   transition-colors  bg-[#FCFFFC] hover:bg-[#0077b6] hover:text-white hover:border-white  border-black border text-center"
        >
          Category
        </Link>
        <Link
          href={""}
          className="px-4 py-3 rounded-2xl font-medium text-lg w-[190px]    transition-colors text-white bg-[#0077b6] hover:text-black border hover:border-black hover:bg-[#ffffff] text-center col-start-5"
        >
          Create an event
        </Link>
      </div>
      <div className="w-full h-[2px] bg-[#aaaaaa49] my-4"></div>

      <div className=" w-full min-[503px]:px-4 py-4">
        {isLoading && (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-4">
            <PropertyLoader uniqueKey="1" />
            <PropertyLoader uniqueKey="2" />
            <PropertyLoader uniqueKey="3" />
            <PropertyLoader uniqueKey="4" />
            <PropertyLoader uniqueKey="5" />
            <PropertyLoader uniqueKey="6" />
          </div>
        )}
        <div className="ml-96">
          <p className="text-xl">Today</p>
          <div className="w-[100px] h-1 bg-[#0077b6] mb-4"></div>
        </div>
        {filteredEvents?.length ? (
          <div className="grid lg:grid-cols-5  min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
            <IconChevronLeft
              size={150}
              color="#14213d"
              stroke={0.5}
              className="justify-self-end transition-colors hover:bg-[#fafafa] rounded-full active:bg-[#0077b6]"
              cursor={"pointer"}
            />
            {filteredEvents?.map((event) => (
              <EventCard key={event._id} {...event} />
            ))}
            <IconChevronRight
              size={150}
              color="#14213d"
              stroke={0.5}
              className="justify-self-start transition-colors hover:bg-[#fafafa] rounded-full active:bg-[#0077b6]"
              cursor={"pointer"}
            />
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center w-full h-[876px] text-gray-600 text-center ">
              <IconFileSad size={70} />
              <p className="font-medium text-3xl">No results found</p>
            </div>
          )
        )}
        <div className="ml-96 mt-10">
          <p className="text-xl">This week</p>
          <div className="w-[100px] h-1 bg-[#0077b6] mb-4"></div>
        </div>
        {filteredEvents?.length ? (
          <div className="grid lg:grid-cols-5 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
            <IconChevronLeft
              size={150}
              color="#14213d"
              stroke={0.5}
              className="justify-self-end transition-colors hover:bg-[#fafafa] rounded-full active:bg-[#0077b6]"
              cursor={"pointer"}
            />
            {filteredEvents?.map((event) => (
              <EventCard key={event._id} {...event} />
            ))}
            <IconChevronRight
              size={150}
              color="#14213d"
              stroke={0.5}
              className="justify-self-start transition-colors hover:bg-[#fafafa] rounded-full active:bg-[#0077b6]"
              cursor={"pointer"}
            />
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center w-full h-[876px] text-gray-600 text-center">
              <IconFileSad size={70} />
              <p className="font-medium text-3xl">No results found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EventsDisplay;
