import EventCard from "./EventCard";
import { getEvents } from "@/lib/events";

const DemoCardsDisplay = async () => {
  const data = await getEvents();

  const items = data.slice(0, 3);

  return (
    <div className="flex flex-row w-full items-center justify-center gap-x-6">
      {items.map((item) => (
        <EventCard key={item._id} {...item} />
      ))}
    </div>
  );
};

export default DemoCardsDisplay;
