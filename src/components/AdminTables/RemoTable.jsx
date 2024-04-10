"use client";
import React, { useState } from "react";
import {
  IconEye,
  IconFile,
  IconFileExport,
  IconSearch,
} from "@tabler/icons-react";
import RemoAdminView from "../AdminViews/RemoAdminView";

const RemoTable = ({ remoData, loading, setFetchTrigger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showRemoView, setShowDemoView] = useState();
  const [selectedRemoId, setSelectedRemoId] = useState(null);

  const openEditForm = (remoId) => {
    setSelectedRemoId(remoId);
    setShowDemoView(true);
  };

  const closeEditForm = () => {
    setShowDemoView(false);
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

  const filteredRemos = remoData.filter((user) =>
    Object.values(user).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRemos = sortBy
    ? filteredRemos.sort((a, b) => {
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
    : filteredRemos;

  const pageSize = 9;
  const totalPages = Math.ceil(sortedRemos.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRemos = sortedRemos.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openPdf = (pdfLink) => {
    window.open(pdfLink, "_blank");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const exportToCSV = () => {
    const csvHeaders = [
      "ID",
      "User Name",
      "User Email",
      "User Phone",
      "Service Name",
      "Date",
      "PDF File",
    ];

    const csvData = remoData.map((remo) => {
      const formattedDate = new Date(remo.date).toLocaleDateString();
      const formattedTime = new Date(remo.date).toLocaleTimeString();
      return [
        remo._id,
        remo.userName,
        remo.userEmail,
        remo.userPhone,
        remo.serviceName,
        `${formattedDate} ${formattedTime}`,
        remo.pdfFile,
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
    link.setAttribute("download", "remo_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col gap-4 m-2">
          {/* Skeleton for buttons */}
          <div className="animate-pulse flex justify-between gap-4">
            <div className="bg-gray-200 xl:w-56 w-1/2 h-10 rounded-md"></div>
            <div className="bg-gray-200 xl:w-56 w-1/2 h-10 rounded-md"></div>
          </div>

          {/* Skeleton for cards */}
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative animate-pulse h-[200px]"
              >
                <div className="flex">
                  <div className="mx-4 my-2 w-full space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 my-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="flex gap-4 justify-center">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <section className="self-center flex flex-col  justify-start h-full  xl:overflow-hidden">
          <div className="flex p-2 gap-2 relative justify-between">
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
              disabled={paginatedRemos.length === 0}
            >
              Export
              <IconFileExport className="ml-2" />
            </button>
          </div>
          {paginatedRemos.length === 0 ? (
            <p className="text-gray-600 text-base mx-2 my-4">
              No quotes to display
            </p>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 m-2">
              {paginatedRemos.map((remo, index) => (
                <div
                  key={remo._id}
                  className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative h-full"
                >
                  <div className="flex">
                    <div className="mx-4 my-2">
                      <h3 className="text-base xl:text-xl font-semibold mb-2 text-[#8c2828] h-12">
                        {remo.serviceName}
                      </h3>

                      <p className="text-gray-600 text-sm xl:text-base">
                        {" "}
                        {remo.userName}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {remo.userEmail}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {remo.userPhone}
                      </p>

                      <p className="text-gray-600 text-sm xl:text-base">
                        {formatDate(remo.date)}
                      </p>
                    </div>
                  </div>

                  <div className="xl:absolute xl:bottom-2 xl:right-2 flex flex-row justify-center space-x-2">
                    <button
                      className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                      onClick={() => openEditForm(remo)}
                    >
                      <IconEye className="mr-2" />
                      View
                    </button>
                    <button
                      className="bg-[#f6eeee] hover:bg-rose-300 hover:text-white text-[#8c2828] font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                      onClick={() => openPdf(remo.pdfFile)}
                    >
                      <IconFile className="mr-2" />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
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

      {showRemoView && (
        <RemoAdminView remoId={selectedRemoId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default RemoTable;
