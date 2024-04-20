import CardsLoader from "@/components/CardsLoader";
import EventsDisplay from "@/components/EventsDisplay";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4]  xl:pt-[50px] container-xl`}>
      <section
        id="services"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <h1 className="xl:text-[64px] text-[42px]">
          Punta Banda Community Events
        </h1>
        <p className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
          Let PB Plus Publish Your Events
        </p>
        <div className="w-[100px] h-1 bg-[#0077b6] mb-4"></div>

        <Link
          href={"/community/events/new-event"}
          className="community-button self-end mb-4"
        >
          Create an event
        </Link>

        <Suspense fallback={<CardsLoader />}>
          <EventsDisplay />
        </Suspense>
      </section>
    </main>
  );
}
