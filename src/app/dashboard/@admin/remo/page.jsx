"use client";
import React, { useState, useEffect } from "react";
import RemoTable from "@/components/AdminTables/RemoTable";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPrices = async () => {
      try {
        const res = await axios.get("/api/prices");
        setPrices(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <main className="flex w-full">
      <div className=" w-full pt-[60px] m-4">
        <div className="w-full  h-20 bg-white shadow-md border border-gray-200 flex justify-start items-center px-4 rounded-xl mb-4">
        <Breadcrumb />
        </div>

        <div className="border border-gray-200 shadow-md bg-white rounded-xl py-2">
          <RemoTable remoData={prices} />
        </div>
      </div>
    </main>
  );
};

export default page;
