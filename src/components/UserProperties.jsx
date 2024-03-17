"use client"
import React, { useState } from "react";
import PropertyCard from "./PropertyCard";

const UserProperties = ({ data }) => {
  const [properties, setProperties] = useState(data);

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 self-start">
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </div>
  );
};

export default UserProperties;
