import { auth } from "@/app/api/auth/[...nextauth]/route";
import EventPage from "@/components/EventPage";
import React from "react";

const page = async ({ params: { id } }) => {
  const session = await auth();

  return <EventPage id={id} session={session} />;
};

export default page;
