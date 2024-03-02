"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyLoader from "./PropertyLoader";
import { IconError404, IconFileSad, IconSearchOff } from "@tabler/icons-react";

const PropertiesDisplay = () => {
  // TODO: Refactorizar a server component
  const items = [
    { value: "recentlyAdded", label: "Recently Added" },
    { value: "The Ejido", label: "The Ejido" },
    { value: "Bufadora", label: "Bufadora" },
    { value: "The Spit", label: "The Spit" },
    { value: "Maneadero", label: "Maneadero" },
  ];

  const [value, setValue] = useState("recentlyAdded");
  const [properties, setProperties] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterProperties = (filterValue, propertiesList) => {
    let filteredProperties;
    if (filterValue === "recentlyAdded") {
      filteredProperties = propertiesList;
    } else {
      filteredProperties = propertiesList?.filter((property) =>
        property.zone.includes(filterValue)
      );
    }
    return filteredProperties;
  };

  useEffect(() => {
    axios
      .get("/api/properties")
      .then((res) => {
        const propertiesData = res.data;
        setIsLoading(false);
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = filterProperties(value, properties);
    setFilteredProperties(filtered);
  }, [value, properties]);

  return (
    <div className="flex flex-col w-full">
      <div className="property-zone-radio">
        {items.map((item) => (
          <label key={item.value} htmlFor={item.value}>
            <input
              type="radio"
              id={item.value}
              name="propertyZone"
              checked={value === item.value}
              onChange={(e) => setValue(e.target.value)}
              value={item.value}
            />
            <span>{item.label}</span>
            <div></div>
          </label>
        ))}
      </div>
      <div className=" w-full border-2 border-gray-300 rounded-lg min-[503px]:px-4 py-4">
        {isLoading && (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-4">
            <PropertyLoader uniqueKey="1" />
            <PropertyLoader uniqueKey="2" />
            <PropertyLoader uniqueKey="3" />
            <PropertyLoader uniqueKey="4" />
            <PropertyLoader uniqueKey="5" />
            <PropertyLoader uniqueKey="6" />
          </div>
        )}
        {filteredProperties?.length ? (
          <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2">
            {filteredProperties?.map((property) => (
              <PropertyCard key={property._id} {...property} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center w-full h-[876px] text-gray-600 text-center">
              <IconFileSad size={70} />
              <p className="font-medium text-3xl">No results found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PropertiesDisplay;
