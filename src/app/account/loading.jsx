import Spinner from "@/components/Spinner";
import React from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const loading = () => {
  return (
    <main className="h-screen">
      <LoadingScreen />
    </main>
  );
};

export default loading;
