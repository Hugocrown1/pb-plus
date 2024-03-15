"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormsTable from "@/components/AdminTables/FormsTable";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
    const [consultations, setConsultations] = useState([])

    useEffect(() => {
        const fetchConsultations= async () => {
          try {
            const res = await axios.get("/api/consultations");
            setConsultations(res.data);
          } catch (error) {
            console.error("Error fetching consultations:", error);
          }
        };
    
        fetchConsultations();
    
        
        const interval = setInterval(fetchConsultations, 5000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
  return (
    <main className="flex w-full">
    <div className=" w-full pt-[60px] m-4">
      <div className="w-full  h-20 bg-white shadow-md border border-gray-200 flex justify-start items-center px-4 rounded-xl mb-4">
      <Breadcrumb />
      </div>

      <div className="border border-gray-200 shadow-md bg-white rounded-xl py-2">
          <FormsTable formData={consultations} />
        </div>
      </div>
    </main>
  );
};

export default page;
