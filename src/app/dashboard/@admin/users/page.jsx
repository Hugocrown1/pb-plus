"use client";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/AdminTables/UsersTable";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        setFetchTrigger(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
        setFetchTrigger(false);
      });
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16   border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className=" xl:p-4 px-2">
          <UserTable
            users={users}
            loading={loading}
            setFetchTrigger={setFetchTrigger}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
