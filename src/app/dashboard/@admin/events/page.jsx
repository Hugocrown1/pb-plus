"use client";
import React, { useState, useEffect } from "react";
import EventsTable from "@/components/AdminTables/EventsTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("/api/events")
  //     .then((res) => {
  //       setEvents((res.data).reverse());
  //       setLoading(false);
  //       setFetchTrigger(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching prices:", error);
  //       setLoading(false);
  //       setFetchTrigger(false);
  //     });
  // }, [fetchTrigger]);

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const [eventsResponse, usersResponse] = await Promise.all([
          axios.get("/api/events"),
          axios.get("/api/users"),
        ]);

        const usersData = usersResponse.data;

        const eventsWithUserData = eventsResponse.data.map(
          (event) => {
            const user = usersData.find((user) => user._id === event.user);
            const userName = user ? user.name : null;
            return { ...event, userName };
          }
        );

        setEvents(eventsWithUserData);
        setLoading(false);
        setFetchTrigger(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setFetchTrigger(false);
      }
    };

    fetchevents();
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className="xl:p-4 px-2">
          <EventsTable
            events={events}
            loading={loading}
            setFetchTrigger={setFetchTrigger}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
