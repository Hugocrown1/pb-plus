"use client";
import { IconAlertCircleFilled, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { toast } from "sonner";

const SubscriptionNotification = ({ status }) => {
  const [showNotification, setShowNotification] = useState(
    status === "past_due"
  );

  return (
    <>
      {showNotification && (
        <div className="flex p-4 border-[1px] border-[#991b1b] items-center   bg-[#fef2f2] text-[#991b1b] w-full rounded-xl justify-between  ">
          <div className="flex gap-x-2">
            <IconAlertCircleFilled className="min-w-[24px]" /> Your payment
            could not be processed, please update your billing information
          </div>
          <IconX
            onClick={() => setShowNotification(!showNotification)}
            className="cursor-pointer min-w-[24px]"
            color="gray"
          />
        </div>
      )}
    </>
  );
};

export default SubscriptionNotification;
