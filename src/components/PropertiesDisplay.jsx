"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

const PropertiesDisplay = () => {
  const items = [
    { value: "recentlyAdded", label: "Recently Added" },
    { value: "ejido", label: "The Ejido" },
    { value: "bufadora", label: "The Bufadora" },
    { value: "theSpit", label: "The Spit" },
    { value: "maneadero", label: "Maneadero" },
  ];

  const [value, setValue] = useState("recentlyAdded");
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    axios.get("/api/properties").then((res) => setProperties(res.data));
  }, []);

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
      <div className=" w-full border-2 border-gray-300 rounded-lg p-4">
        <div className="grid grid-cols-3 items-center gap-4">
          {properties?.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesDisplay;
