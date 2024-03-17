"use client";
import React, { useState, useEffect } from "react";
import PropertiesTable from "@/components/AdminTables/PropertiesTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const Page = () => {
  const [properties, setProperties] = useState([]);

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

        setProperties(propertiesWithUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="flex w-full">
    <div className=" w-full pt-[60px] m-4">
      <div className="w-full  h-20 bg-white shadow-md border border-gray-200 flex justify-start items-center px-4 rounded-xl mb-4">
      <Breadcrumb />
      </div>

      <div className="border border-gray-200 shadow-md bg-white rounded-xl py-2">
          <PropertiesTable properties={properties} />
        </div>
      </div>
    </main>
  );
};

export default Page;
