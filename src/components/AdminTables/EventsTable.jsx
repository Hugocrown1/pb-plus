import React, { useState } from "react";
import {
  IconEdit,
  IconExternalLink,
  IconSearch,
  IconFileExport,
} from "@tabler/icons-react";
import Image from "next/image";
import EventAdminView from "../AdminViews/EventAdminView";

const EventsTable = ({ events, loading, setFetchTrigger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const openEditForm = (event) => {
    setSelectedEventId(event);
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

  const filteredEvents = events.filter((event) =>
    Object.values(event).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedEvents = sortBy
    ? filteredEvents.sort((a, b) => {
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
    : filteredEvents;

  const pageSize = 6;
  const totalPages = Math.ceil(sortedEvents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    const csvHeaders = [
      "ID",
      "Title",
      "Category",
      "Date",
      "Address",
      "Description",
      "Interested Users",
      "User",
      "Cover Image",
      "Images",
    ];

    const csvData = events.map((event) => {
      const formattedDate = new Date(event.date).toLocaleDateString();
      return [
        event._id,
        event.title,
        event.category,
        formattedDate,
        event.address,
        event.description,
        event.interestedUsers,
        event.user,
        event.coverImage,
        event.images.join(","),
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
    link.setAttribute("download", "event_data.csv");
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
        <section className="self-center flex flex-col justify-start h-full">
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
              disabled={paginatedEvents.length === 0}
            >
              Export
              <IconFileExport className="ml-2" />
            </button>
          </div>
          {paginatedEvents.length === 0 ? (
            <p className="text-gray-600 text-base mx-2 my-4">
              No events to display
            </p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mx-2">
              {paginatedEvents.map((event, index) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md p-4 transition duration-300 flex flex-col justify-between border border-gray-300 relative h-full"
                >
                  <div className="xl:flex">
                    <div>
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        width={250}
                        height={250}
                        className="xl:h-44 xl:w-44 w-full h-52 object-cover rounded-md"
                      />
                    </div>
                    <div className="mx-4 grid grid-cols-2 xl:block">
                      <h3 className="text-base xl:text-xl font-semibold text-[#8c2828]">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {event.category}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {event.address}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {event.description}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {event.userName}
                      </p>
                      <p className="text-gray-600 text-sm xl:text-base">
                        {new Date(event.date).toLocaleDateString()}
                      </p>

                      {event.interested.length > 0 ? (
                        <select className="text-gray-600 text-sm xl:text-base border-none -ml-2 min-w-fit">
                          <option >{event.interested.length} Interested</option>
                          {event.interested.map((interest, index) => (
                            <option disabled key={index} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-600 text-sm xl:text-base">
                          {event.interested.length} Interested
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex-row space-x-2 hidden xl:flex">
                    <p className="text-[#8c2828] text-[15px] xl:text-[25px]">
                      {event.category}
                    </p>
                  </div>
                  <div className="xl:absolute bottom-2 right-2 flex xl:flex-col xl:space-y-1 xl:space-x-0 space-x-2 flex-row justify-center">
                    <button
                      className="bg-[#cffaea] hover:bg-green-300 hover:text-white text-green-600 font-bold  xl:py-2 px-4 py-2 rounded flex items-center"
                      onClick={() => openEditForm({ ...event })}
                    >
                      <IconEdit className="xl:mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-[#f6eeee] hover:bg-rose-300 hover:text-white text-[#8c2828] font-bold  xl:py-2 px-4 py-2 rounded flex items-center"
                      onClick={() =>
                        window.open(`/community/events/${event._id}`, "_blank")
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
        <EventAdminView {...selectedEventId} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default EventsTable;
