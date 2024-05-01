import EventCard from "./EventCard";

import { getEvents } from "@/lib/events";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { IconFileSad } from "@tabler/icons-react";

const EventsDisplay = async () => {
  const session = await auth();
  const events = await getEvents();

  return (
    <>
      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center  mx-auto maw-w-[600px] h-[876px] text-gray-600 text-center">
          <IconFileSad size={70} />
          <p className="font-medium text-3xl text-wrap">No events found.</p>
        </div>
      )}
      {!!events.length && (
        <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
          {events?.map((event) => (
            <EventCard
              key={event._id}
              userSession={session?.user}
              event={event}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default EventsDisplay;
