import Spinner from "@/components/Spinner";
import React from "react";

const loading = () => {
  return (
    <main className="bg-[#f5f3f4] min-h-[800px] flex items-center justify-center ">
      <div className="w-[400px] my-12 h-[400px]">
        <Spinner />
      </div>
    </main>
  );
};

export default loading;
