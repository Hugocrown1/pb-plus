"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconSearch, IconFileExport } from "@tabler/icons-react";
import UserAdminForm from "../AdminViews/UserAdminForm";

const UserTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openEditForm = (userId) => {
    setSelectedUserId(userId);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedUsers = sortBy
    ? filteredUsers.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      })
    : filteredUsers;

  const pageSize = 12;
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    const csvHeaders = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Phone",
      "Role",
      "Date",
    ];

    const csvData = users.map((user) => {
      const formattedDate = new Date(user.date).toLocaleDateString();
      const formattedTime = new Date(user.date).toLocaleTimeString();
      return [
        user._id,
        user.name,
        user.email,
        user.phone,
        user.role,
        `${formattedDate} ${formattedTime}`,
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvHeaders.join(",") +
      "\n" +
      csvData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="">
      <section className="self-center flex flex-col  justify-start h-full">
        <div className="flex p-2 relative justify-between">
          <input
            type="text"
            placeholder="Search"
            className="w-44 px-6 py-2 mr-2"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch className="text-gray-400" />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-300 hover:text-white text-white font-bold py-2 px-4 rounded flex items-center justify-center w-32"
            onClick={exportToCSV}
          >
            Export
            <IconFileExport className="ml-2" />
          </button>
        </div>
        <table className="text-left w-full">
          <thead clas>
            <tr className="text-gray-500">
              <th className="px-4 py-2">#</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                NAME
                {sortBy === "name" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                EMAIL
                {sortBy === "email" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>

              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("role")}
              >
                ROLE
                {sortBy === "role" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>

              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                PHONE
                {sortBy === "phone" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>

              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody classnam>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-blue-100 hover:rounded-md border"
              >
                <td className="px-4 py-2">{startIndex + index + 1}</td>
                <td className="px-4 py-2 flex items-center">
                  <img
                    src={
                      user.image
                        ? user.image
                        : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    }
                    alt={user.name}
                    className="h-10 w-10 rounded-full mx-2"
                  />
                  {user.name}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <p
                    className={`${
                      user.role === "admin"
                        ? "bg-[#FED7AA] rounded-md"
                        : user.role === "user"
                        ? "bg-[#A7F3D0] rounded-md"
                        : ""
                    }`}
                  >
                    {user.role}
                  </p>
                </td>
                <td className="px-4 py-2">
                  {user.phone ? user.phone : "no phone"}
                </td>

                <td className="px-4 py-2">
                  <button
                    className="bg-green-500 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openEditForm(user._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {totalPages > 1 && (
        <div className="p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200"
          >
            {"Previous"}
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200"
          >
            {"Next"}
          </button>
        </div>
      )}
      {showEditForm && (
        <UserAdminForm userId={selectedUserId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default UserTable;
