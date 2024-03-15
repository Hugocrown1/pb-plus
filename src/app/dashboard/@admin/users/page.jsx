"use client";
import React from "react";
import UserTable from "@/components/AdminTables/UsersTable";
import axios from "axios";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Establecer un intervalo para solicitar actualizaciones periódicas
    const interval = setInterval(fetchUsers, 5000); // Solicitar cada 5 segundos

    return () => {
      clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    };
  }, []);
  
  return (
    <main className="flex w-full">
    <div className=" w-full pt-[60px] m-4">
      <div className="w-full  h-20 bg-white shadow-md border border-gray-200 flex justify-start items-center px-4 rounded-xl mb-4">
      <Breadcrumb />
      </div>

      <div className="border border-gray-200 shadow-md bg-white rounded-xl py-2">
          <UserTable users={users} />
        </div>
      </div>
    </main>
  );
};

export default page;
