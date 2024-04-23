// "use client";
// import React, { useEffect, useState } from "react";
// import Breadcrumb from "@/components/Breadcrumb";


// const Page = () => {
//     const stripeClient = require("stripe")('sk_test_51P3SDY13yf7FOQ66PxKfK9aZQzaIBALGGIGIWRowreQrWS73pMtFbr95heW29mg3kqk0g42W1lhcoD9K7XiAhLu400MyPQdCVG');
//     const [customerData, setCustomerData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const customers = await stripeClient.customers.list();
//                 console.log(customers.data);
//                 const subscriptions = await stripeClient.subscriptions.list();
//                 console.log(subscriptions.data)
    
//                 const combinedData = subscriptions.data.map(subscription => {
//                     const customer = customers.data.find(customer => customer.id === subscription.customer);
//                     return {
//                         id: subscription.id,
//                         userEmail: customer.email,
//                     };
//                 });
    
//                 setCustomerData(combinedData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
    
//         fetchData();
//     }, []);
    

//     return (
//         <main className="flex w-full bg-white min-h-screen">
//             <div className="w-full pt-[60px]">
//                 <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
//                     <Breadcrumb />
//                 </div>

//                 <div className="xl:p-4 px-2">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
                                
//                                 <th>User Email</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customerData.map((data, index) => (
//                                 <tr key={index}>
//                                     <td>{data.id}</td>
                                    
//                                     <td>{data.userEmail}</td>
                                
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Page;

"use client";
import React, { useState, useEffect } from "react";
import AdvertisingTable from "@/components/AdminTables/AdvertisingTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [ads, setads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchads = async () => {
      try {
        const [adsResponse, usersResponse] = await Promise.all([
          axios.get("/api/restaurants"),
          axios.get("/api/users"),
        ]);

        const usersData = usersResponse.data;

        const adsWithUserData = adsResponse.data.map(
          (event) => {
            const user = usersData.find((user) => user._id === event.user);
            const userName = user ? user.name : null;
            return { ...event, userName };
          }
        );

        setads(adsWithUserData);
        setLoading(false);
        setFetchTrigger(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setFetchTrigger(false);
      }
    };

    fetchads();
  }, [fetchTrigger]);

  return (
    <main className="flex w-full bg-white min-h-screen">
      <div className="w-full pt-[60px]">
        <div className="w-full h-16 border-b-4 border-gray-200 flex justify-start items-center xl:p-6 px-4">
          <Breadcrumb />
        </div>

        <div className="xl:p-4 px-2">
          <AdvertisingTable
            ads={ads}
            loading={loading}
            setFetchTrigger={setFetchTrigger}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
