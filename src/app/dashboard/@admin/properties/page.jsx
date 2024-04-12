"use client";
import React, { useState, useEffect } from "react";
import PropertiesTable from "@/components/AdminTables/PropertiesTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [propertiesResponse, usersResponse] = await Promise.all([
          axios.get("/api/properties"),
          axios.get("/api/users"),
        ]);

        const usersData = usersResponse.data;

        const propertiesWithUserData = propertiesResponse.data.map(
          (property) => {
            const user = usersData.find((user) => user._id === property.user);
            const userName = user ? user.name : null;
            const userImage = user ? user.image : null;
            return { ...property, userName, userImage };
          }
        );

        setProperties(propertiesWithUserData.reverse());
        setLoading(false);
        setFetchTrigger(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setFetchTrigger(false);
      }
    };

    fetchProperties();
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16   border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className="xl:p-4 px-2">
          <PropertiesTable
            properties={properties}
            loading={loading}
            setFetchTrigger={setFetchTrigger}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
