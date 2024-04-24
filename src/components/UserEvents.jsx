import EventCard from "./EventCard";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const UserEvents = async ({ events }) => {
  const { user } = await auth();
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2 self-start">
      {events.map((event) => {
        const formattedevent = {
          ...event,
          _id: event._id.toString(),
          user: event.user.toString(),
        };

        return (
          <div className="max-h-fit">
            <EventCard
            key={formattedevent._id}
            userSession={user}
            {...formattedevent}
          />
          </div>
        );
      })}
    </div>
  );
};

export default UserEvents;
