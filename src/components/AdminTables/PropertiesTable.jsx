import React, { useState } from "react";
import Link from "next/link";
import PropertyAdminForm from "../AdminViews/PropertyAdminForm";
import {
  IconX,
  IconExternalLink,
  IconEdit,
  IconSearch,
  IconFileExport,
} from "@tabler/icons-react";

const PropertiesTable = ({ properties }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const openEditForm = (propertyId) => {
    setSelectedPropertyId(propertyId);
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

  const pageSize = 3;
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
      "Description",
      "Image",
    ];

    const csvData = properties.map((property) => {
      const formattedDate = new Date(property.publishDate).toLocaleDateString();
      const formattedTime = new Date(property.publishDate).toLocaleTimeString();
      return [
        property._id,
        property.title,
        property.type,
        property.price,
        property.bathrooms,
        property.bedrooms,
        `${formattedDate} ${formattedTime}`,
        property.zone,
        property.address,
        property.user,
        property.description,
        property.coverImage,
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
    <div className="">
      <section className="self-center flex flex-col  justify-start  h-full">
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
        <div className="grid grid-cols-1 gap-4">
          {paginatedProperties.map((property, index) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 mx-2 relative h-fit"
            >
              <div className="flex">
                <div>
                  <img
                    src={property.coverImage}
                    alt={property.title}
                    className="xl:h-44 xl:w-44 h-32 w-32 object-cover rounded-md mb-4"
                  />
                </div>
                <div className="mx-4">
                  <h3 className="text-base xl:text-xl font-semibold mb-2 text-[#8c2828]">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm xl:text-base">
                    Seller: {property.userName}
                  </p>
                  <p className="text-gray-600 text-sm xl:text-base">
                    Address: {property.address}
                  </p>
                  <p className="text-gray-600 text-sm xl:text-base">
                    Type: {property.type}
                  </p>
                  <p className="text-gray-600 text-sm xl:text-base">
                    Price: {property.price}
                  </p>

                  <p className="text-gray-600 text-sm xl:text-base">
                    Publish Date: {formatDate(property.publishDate)}
                  </p>
                  <div className="flex">
                    <p className="text-gray-600 ">{property.bedrooms} Bed</p>
                    <p className="text-gray-600 ">{property.bathrooms} Bath</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex flex-row space-x-2">
                <p className="text-[#8c2828] text-[20px] xl:text-[35px]">
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
              <div className="xl:absolute bottom-2 right-2 flex flex-row space-x-2">
                <button
                  className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                  onClick={() => openEditForm(property._id)}
                >
                  <IconEdit className="mr-2" />
                  Edit
                </button>
                <button
                  className="bg-[#f6eeee] hover:bg-rose-300 hover:text-white text-[#8c2828] font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                  onClick={() => openEditForm(property._id)}
                >
                  <IconExternalLink className="mr-2" />
                  View ad on
                </button>
                <button
                  className="bg-[#f9ece9] hover:bg-red-300 hover:text-white text-[#fc8a6f] font-bold xl:px-4 xl:py-2 px-2 py-1 rounded flex items-center"
                  onClick={() => openEditForm(property._id)}
                >
                  <IconX className="mr-2" />
                  Delete
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

      {showEditForm && (
        <PropertyAdminForm
          propertyId={selectedPropertyId}
          onClose={closeEditForm}
        />
      )}
    </div>
  );
};

export default PropertiesTable;
