"use client";
import React, { useState, useEffect } from "react";
import FormsTable from "@/components/AdminTables/FormsTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    axios
      .get("/api/consultations")
      .then((res) => {
        setConsultations(res.data.reverse());
        setLoading(false);
        setFetchTrigger(false);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
        setLoading(false);
        setFetchTrigger(false);
      });
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className="xl:p-4 px-2">
          <FormsTable
            formData={consultations}
            loading={loading}
            setFetchTrigger={setFetchTrigger}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
