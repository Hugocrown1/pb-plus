"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ManageBillButton = ({ customerId }) => {
  const router = useRouter();

  const generatePortalLink = async () => {
    toast.loading("Redirecting, please wait...");
    const { data: manageLink } = await axios.post("/api/portal", {
      customerId,
    });

    router.push(manageLink);
  };

  return (
    <button
      onClick={generatePortalLink}
      className="primary-button hover:bg-gray-500/10 transition-colors"
    >
      Manage bill info
    </button>
  );
};

export default ManageBillButton;
