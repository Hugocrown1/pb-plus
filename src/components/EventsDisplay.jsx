import EventCard from "./EventCard";

import CardsLoader from "./CardsLoader";
import { getEvents } from "@/lib/events";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const EventsDisplay = async () => {
  const session = await auth();
  const events = await getEvents();

  return (
    <>
      {!events && <CardsLoader />}
      <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
        {events?.map((event) => (
          <EventCard
            key={event._id}
            userSession={session?.user}
            event={event}
          />
        ))}
      </div>
    </>
  );
};

export default EventsDisplay;