import Spinner from "@/components/Spinner";
import React from "react";

const loading = () => {
  return (
    <main className="bg-[#f5f3f4] min-h-[800px] ">
      <div className="w-[400px] flex justify-center items-center my-12 h-[400px]">
        <Spinner />
      </div>
    </main>
  );
};

export default loading;
