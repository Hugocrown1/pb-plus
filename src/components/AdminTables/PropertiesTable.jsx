import React, { useState } from "react";
import Image from "next/image";
import PropertyAdminForm from "../AdminViews/PropertyAdminForm";
import {
  IconExternalLink,
  IconEdit,
  IconSearch,
  IconFileExport,
} from "@tabler/icons-react";

const PropertiesTable = ({ properties, loading, setFetchTrigger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const openEditForm = (property) => {
    setSelectedPropertyId(property);
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

  const filteredProperties = properties.filter((property) =>
    Object.values(property).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sortedProperties = sortBy
    ? filteredProperties.sort((a, b) => {
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
    : filteredProperties;

  const pageSize = 6;
  const totalPages = Math.ceil(sortedProperties.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProperties = sortedProperties.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    const csvHeaders = [
      "ID",
      "Title",
      "Type",
      "Price",
      "Bathrooms",
      "Bedrooms",
      "Date",
      "Zone",
      "Address",
      "User",
      "Image",
      "Description",
    ];

    const csvData = properties.map((property) => {
      const formattedDate = new Date(property.publishDate).toLocaleDateString();
      const formattedTime = new Date(property.publishDate).toLocaleTimeString();
      const cleanedTitle = property.title.replace(/[^\w\s]/g, "");
      const cleanedAddress = property.address.replace(/[^\w\s]/g, "");
      const cleanedDescription = property.description.replace(/[^\w\s]/g, "");
      return [
        property._id,
        `${cleanedTitle}`,
        property.type,
        property.price,
        property.bathrooms,
        property.bedrooms,
        `${formattedDate} ${formattedTime}`,
        property.zone,
        `${cleanedAddress}`,
        property.user,
        property.coverImage,
        `${cleanedDescription}`,
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
    link.setAttribute("download", "property_data.csv");
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
          <div className="grid xl:grid-cols-2 lg:grid-cols-1 grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative animate-pulse xl:h-[200px]"
              >
                <div className="flex flex-col xl:flex-row">
                  <div className="h-52 xl:h-full xl:w-1/3 w-full bg-gray-200 rounded"></div>
                  <div className="mx-4 my-2 w-full xl:space-y-2 space-y-1">
                    
                    <div className="h-4 bg-gray-200 rounded w-4/5 my-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="flex gap-4 justify-center xl:justify-end">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
              disabled={paginatedProperties.length === 0}
            >
              Export
              <IconFileExport className="ml-2" />
            </button>
          </div>
          {paginatedProperties.length === 0 ? (
            <p className="text-gray-600 text-base mx-2 my-4">
              No properties to display
            </p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mx-2">
              {paginatedProperties.map((property, index) => (
                <div
                  key={property._id}
                  className="bg-white  rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative h-full"
                >
                  <div className="xl:flex">
                    <div>
                      <Image
                        src={property.coverImage}
                        alt={property.title}
                        width={250}
                        height={250}
                        className="xl:h-44 xl:w-44 w-full h-52 object-cover rounded-md"
                      />
                    </div>
                    <div className="mx-4 grid grid-cols-2 xl:block">
                      <h3 className="text-base xl:text-xl font-semibold  text-[#8c2828]">
                        {property.title}
                      </h3>
                      <p className="text-base xl:text-xl font-semibold text-[#8c2828]  xl:hidden">
                        ${" "}
                        {property.type === "Rental"
                          ? property.price
                          : property.price + " "}
                        {property.type === "Rental" && (
                          <span className="text-gray-600 text-xs">/ month</span>
                        )}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {property.userName}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {property.address}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {property.zone}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {property.type}
                      </p>

                      <p className="text-gray-600 text-sm xl:text-base">
                        {formatDate(property.publishDate)}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-gray-600 text-sm xl:text-base">
                          {property.bedrooms} Bed
                        </p>
                        <p className="text-gray-600 text-sm xl:text-base">
                          {property.bathrooms} Bath
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex-row space-x-2 hidden xl:flex">
                    <p className="text-[#8c2828] text-[15px] xl:text-[25px]">
                      ${" "}
                      {property.type === "Rental"
                        ? property.price
                        : property.price + " "}
                      {property.type === "Rental" && (
                        <span className="text-gray-600 text-[15px] xl:text-[25px]">
                          / month
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="xl:absolute bottom-2 right-2 flex xl:flex-col xl:space-y-1 xl:space-x-0 space-x-2 flex-row  justify-center">
                    <button
                      className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold  xl:py-2 px-4 py-2 rounded flex items-center"
                      onClick={() => openEditForm({ ...property })}
                    >
                      <IconEdit className="xl:mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-[#f6eeee] hover:bg-rose-300 hover:text-white text-[#8c2828] font-bold  xl:py-2 px-4 py-2 rounded flex items-center"
                      onClick={() =>
                        window.open(
                          `/real-estate/houses-&-properties/${property._id}`,
                          "_blank"
                        )
                      }
                    >
                      <IconExternalLink className="xl:mr-2" />
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

      {showEditForm && (
        <PropertyAdminForm {...selectedPropertyId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default PropertiesTable;
