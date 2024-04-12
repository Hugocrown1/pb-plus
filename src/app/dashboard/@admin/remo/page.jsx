"use client";
import React, { useState, useEffect } from "react";
import RemoTable from "@/components/AdminTables/RemoTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    axios
      .get("/api/prices")
      .then((res) => {
        setPrices((res.data).reverse());
        setLoading(false);
        setFetchTrigger(false);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
        setLoading(false);
        setFetchTrigger(false);
      });
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className="xl:p-4 px-2">
          <RemoTable remoData={prices} loading={loading} setFetchTrigger={setFetchTrigger}/>
        </div>
      </div>
    </main>
  );
};

export default page;

// import React from "react";
// import RemoTable from "@/components/AdminTables/RemoTable";
// import Prices from "@/models/price";
// import { connectDB } from "@/lib/mongoose";
// import Breadcrumb from "@/components/Breadcrumb";

// const getPrices = async () => {
//   await connectDB();
//   const response = await Prices.find().lean().exec();

//   return response.reverse().map((price) => {
//     price._id = price._id.toString();
//     price.responses = price.responses.map((response) => {
//       const responseObject = {
//         _id: response._id.toString(),
//         question: response.question,
//         answer: response.answer,
//       };
//       return responseObject;
//     });
//     return price;
//   });
// };

// const page = async () => {
//   const prices = await getPrices();

//   return (
//     <main className="flex w-full bg-white min-h-screen">
//       <div className="w-full pt-[60px]">
//         <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
//         <Breadcrumb/>
//         </div>

//         <div className="xl:p-4 px-2">
//           <RemoTable remoData={prices}/>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default page;
