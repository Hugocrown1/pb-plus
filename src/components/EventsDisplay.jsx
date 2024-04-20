import EventCard from "./EventCard";
import { connectDB } from "@/lib/mongoose";
import Events from "@/models/events";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const getEvents = async () => {
  await connectDB();
  const response = await Events.find().lean();

  return response;
};

const EventsDisplay = async () => {
  // TODO: Refactorizar a server component

  const events = await getEvents();

  const { user } = await auth();

  return (
    <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
      {events?.map((event) => (
        <EventCard key={event._id} userSession={user} {...event} />
      ))}
    </div>
  );
};

export default EventsDisplay;
