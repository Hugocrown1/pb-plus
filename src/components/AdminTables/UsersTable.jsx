import React, { useState } from "react";
import { IconSearch, IconFileExport, IconEdit } from "@tabler/icons-react";
import UserAdminForm from "../AdminViews/UserAdminForm";

const UserTable = ({ users, loading, setFetchTrigger }) => {
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
    setFetchTrigger(true);
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

  const pageSize = 10;
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    const csvHeaders = ["ID", "Name", "Email", "Phone", "Role"];

    const csvData = users.map((user) => {
      return [user._id, user.name, user.email, user.phone, user.role];
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
    <div>
      {loading ? (
        <div className="animate-pulse m-2">
           {/* Skeleton for buttons */}
           <div className="flex justify-between gap-4">
            <div className="bg-gray-200 xl:w-56 w-1/2 h-10 rounded-md"></div>
            <div className="bg-gray-200 xl:w-56 w-1/2 h-10 rounded-md"></div>
          </div>
          <table className="text-left w-full">
            <thead className="md:table-header-group">
              <tr className="text-gray-500">
                <th className="xl:px-4 py-2">
                  <div className="h-4 w-2 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-2 hidden md:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-2 hidden md:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-2 hidden md:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody className="md:table-row-group">
              {Array.from({ length: 5 }, (_, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-100 hover:rounded-md border-y"
                >
                  <td className="xl:px-4 py-2">
                    <div className="h-4 w-2 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    <div className="h-10 w-10 bg-gray-300 rounded-full mx-2"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="">
          <section className="self-center flex flex-col  justify-start  h-full">
            <div className="flex p-2 gap-2  relative justify-between">
              <input
                type="text"
                placeholder="Search"
                className="xl:w-56 w-1/2 pl-8 py-2"
                value={searchTerm}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="text-gray-400" />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-300 hover:text-white text-white font-bold py-2 px-4 rounded flex items-center justify-center xl:w-44 w-1/2"
                onClick={exportToCSV}
              >
                Export
                <IconFileExport className="ml-2" />
              </button>
            </div>
            <table className="text-left w-full">
              <thead className=" md:table-header-group">
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
                    className="px-4 py-2 cursor-pointer hidden md:table-cell"
                    onClick={() => handleSort("email")}
                  >
                    EMAIL
                    {sortBy === "email" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hidden md:table-cell"
                    onClick={() => handleSort("role")}
                  >
                    ROLE
                    {sortBy === "role" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hidden md:table-cell"
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
              <tbody className=" md:table-row-group">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-blue-100 hover:rounded-md border-y"
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
                    <td className="px-4 py-2 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {user.phone ? user.phone : "no phone"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                        onClick={() => openEditForm(user._id)}
                      >
                        <IconEdit className="mr-2" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {totalPages > 1 && (
            <div className="px-2 pt-8 pb-2 flex items-center justify-center xl:justify-start">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white py-1 px-2 xl:py-2 xl:px-4 rounded-md border border-gray-300 hover:bg-gray-200"
              >
                {"Previous"}
              </button>
              <span className="mx-1 xl:mx-2">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white py-1 px-2 xl:py-2 xl:px-4 rounded-md border border-gray-300 hover:bg-gray-200"
              >
                {"Next"}
              </button>
            </div>
          )}
          {showEditForm && (
            <UserAdminForm userId={selectedUserId} onClose={closeEditForm} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserTable;
