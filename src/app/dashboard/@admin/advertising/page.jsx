"use client";
import React, { useState, useEffect } from "react";
import AdvertisingTable from "@/components/AdminTables/AdvertisingTable";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";

const page = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const [adsResponse, usersResponse, subscriptionsResponse] = await Promise.all([
          axios.get("/api/restaurants"),
          axios.get("/api/users"),
          axios.get("/api/subscriptions")
        ]);
  
        const usersData = usersResponse.data;
        const subscriptionsData = subscriptionsResponse.data.data; // Accedemos a la lista de suscripciones
  
        const adsWithUserData = adsResponse.data.map(ad => {
          const user = usersData.find(user => user._id === ad.user);
          const userName = user ? user.name : null;
          const stripeCustomerId = user ? user.stripe_customer_id : null;
  
          // Find subscriptions for the current user's stripe_customer_id
          const userSubscriptions = subscriptionsData.filter(sub => sub.customer === stripeCustomerId);
          
          // Extract current_period_end and current_period_start from each subscription
          const subscriptionInfo = userSubscriptions.map(sub => ({
            currentPeriodEnd: sub.current_period_end,
            currentPeriodStart: sub.current_period_start
          }));
  
          return { ...ad, userName, stripeCustomerId, subscriptionInfo };
        });
  
        console.log("adsWithUserData", adsWithUserData);
        setAds(adsWithUserData);
        setLoading(false);
        setFetchTrigger(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setFetchTrigger(false);
      }
    };
  
    fetchAds();
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
