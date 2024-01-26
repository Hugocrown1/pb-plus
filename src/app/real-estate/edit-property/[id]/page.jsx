"use client";
import PropertyForm from "@/components/PropertyForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;

  const [propertyInfo, setPropertyInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/properties/" + id).then((res) => {
      setPropertyInfo(res.data);
    });
  }, [id]);

  return (
    <main className="container-xl bg-[#f5f3f4]">
      {propertyInfo && <PropertyForm {...propertyInfo} />}
    </main>
  );
};

export default page;
