import { auth } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/EventForm";
import { getEvent } from "@/lib/events";
import { redirect } from "next/navigation";

const EditEventPage = async ({ params: { id } }) => {
  const eventInfo = await getEvent(id);
  const session = await auth();

  if (eventInfo.user._id !== session?.user.id) {
    redirect("/community/events");
  }

  return (
    <main className="container-xl bg-[#f5f3f4]">
      {eventInfo && <EventForm {...eventInfo} />}
    </main>
  );
};

export default EditEventPage;
