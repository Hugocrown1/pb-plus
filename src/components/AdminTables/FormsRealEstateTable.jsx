"use client";
import React, { useState } from "react";
import {
  IconEye,
  IconSearch,
  IconFileExport
} from "@tabler/icons-react";
import FormAdminView from "../AdminViews/FormRealEstateAdmin";

const FormsTable = ({ formData, loading, setFetchTrigger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showRemoView, setShowDemoView] = useState();
  const [selectedFormId, setSelectedFormId] = useState(null);

  const openEditForm = (formId) => {
    setSelectedFormId(formId);
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

  const filteredForms = formData.filter((user) =>
    Object.values(user).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRemos = sortBy
    ? filteredForms.sort((a, b) => {
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
    : filteredForms;

  const pageSize = 9;
  const totalPages = Math.ceil(sortedRemos.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRemos = sortedRemos.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      "Service Name",
      "Name",
      "Phone",
      "Email",
      "Date",
      "Message",
    ];

    const csvData = formData.map((form) => {
      const formattedDate = new Date(form.date).toLocaleDateString();
      const formattedTime = new Date(form.date).toLocaleTimeString();
      const cleanedMessage = form.message.replace(/[^\w\s]/g, "");
      return [
        form._id,
        form.serviceName,
        form.userName,
        form.userPhone,
        form.userEmail,
        `${formattedDate} ${formattedTime}`,
        `${cleanedMessage}`,
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
    link.setAttribute("download", "legal_form_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="">
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
                  <div className="flex gap-4 justify-center xl:justify-end">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        <section className="self-center flex flex-col  justify-start h-full  xl:overflow-hidden">
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
              disabled={paginatedRemos.length === 0}
            >
              Export
              <IconFileExport className="ml-2" />
            </button>
          </div>
          {paginatedRemos.length === 0 ? (
            <p className="text-gray-600 text-base mx-2 my-4">
              No forms to display
            </p>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 m-2">
              {paginatedRemos.map((form, index) => (
                <div
                  key={form._id}
                  className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative h-full"
                >
                  <div className="flex">
                    <div className="mx-4 my-2">
                      <h3 className="text-base xl:text-xl font-semibold mb-2 text-[#8c2828] h-12">
                        {form.serviceName}
                      </h3>

                      <p className="text-gray-600 text-sm xl:text-base">
                        {form.userName}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {form.userEmail}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {form.userPhone}
                      </p>

                      <p className="text-gray-600 text-sm xl:text-base">
                        {formatDate(form.date)}
                      </p>
                    </div>
                    
                  </div>

                  <div className="xl:absolute xl:bottom-2 xl:right-2 flex flex-row justify-center space-x-2">
                    <button
                      className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                      onClick={() => openEditForm(form)}
                    >
                      <IconEye className="mr-2" />
                      View
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
        <FormAdminView formId={selectedFormId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default FormsTable;
