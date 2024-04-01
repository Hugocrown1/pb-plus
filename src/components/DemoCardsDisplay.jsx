import axios from "axios";
import EventCard from "./EventCard";

export const DemoCardsDisplay = async ({ dataUrl }) => {
  const { data } = await axios.get(process.env.URL + dataUrl);

  const items = data.slice(0, 3);

  return (
    <div className="flex flex-row w-full items-center justify-center gap-x-6">
      {items.map((item) => (
        <EventCard key={item._id} {...item} />
      ))}
    </div>
  );
};
