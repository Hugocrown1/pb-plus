"use client";
import React, { useState } from "react";
import { IconEye, IconX, IconSearch, IconFileExport } from "@tabler/icons-react";
import FormAdminView from "../AdminViews/FormAdminView";

const FormsTable = ({ formData }) => {
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

  const pageSize = 10;
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
      return [
        form._id,
        form.serviceName,
        form.userName,
        form.userPhone,
        form.userEmail,
        `${formattedDate} ${formattedTime}`,
        form.message,
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
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          {paginatedRemos.map((form, index) => (
            <div
              key={form._id}
              className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 mx-2 relative h-fit"
            >
              <div className="flex">
                <div className="mx-4 my-2">
                  <h3 className="text-base xl:text-xl font-semibold mb-2 text-[#8c2828]">
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
        <FormAdminView formId={selectedFormId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default FormsTable;
