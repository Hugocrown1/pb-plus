"use client"
import React from "react";
import { useRouter } from "next/navigation";

const page = async () => {
  const router = useRouter();
  
  router.push('/account');
};

export default page;
