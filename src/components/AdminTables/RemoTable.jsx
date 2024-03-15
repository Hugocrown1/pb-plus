"use client";
import React, { useState } from "react";
import {
  IconEye,
  IconFile,
  IconFileExport,
  IconX,
  IconEdit,
  IconSearch,
} from "@tabler/icons-react";
import RemoAdminView from "../AdminViews/RemoAdminView";

const RemoTable = ({ remoData }) => {
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
      "Extra Info",
      "PDF File",
      "Responses",
    ];

    const csvData = remoData.map((remo) => {
      const formattedDate = new Date(remo.date).toLocaleDateString();
      const formattedTime = new Date(remo.date).toLocaleTimeString();
      const responses = remo.responses
        .map((response) => `${response.question}: ${response.answer}`)
        .join("; ");
      return [
        remo._id,
        remo.userName,
        remo.userEmail,
        remo.userPhone,
        remo.serviceName,
        `${formattedDate} ${formattedTime}`,
        remo.extraInfo,
        remo.pdfFile,
        responses,
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
    <div className="">
      <section className="self-center flex flex-col  justify-start h-full  xl:overflow-hidden">
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
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          {paginatedRemos.map((remo, index) => (
            <div
              key={remo._id}
              className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 mx-2 relative h-fit"
            >
              <div className="flex">
                <div className="mx-4 my-2">
                  <h3 className="text-base xl:text-xl font-semibold mb-2 text-[#8c2828]">
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

      {showRemoView && (
        <RemoAdminView remoId={selectedRemoId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default RemoTable;
