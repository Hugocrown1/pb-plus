import RestaurantsDisplay from "@/components/RestaurantsDisplay";
import Link from "next/link";

import { Suspense } from "react";
import CardsLoader from "@/components/CardsLoader";

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4]  pt-[60px] container-xl`}>
      <section
        id="services"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <h1 className="xl:text-[64px] text-[42px]">
          Punta Banda Community Advertising
        </h1>
        <p className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
          Let PB Plus Publish Your Business Menu, Events and More.
        </p>
        <div className="w-[100px] h-1 bg-[#0077b6] mb-4"></div>

        <Link
          href={"/community/advertising/new-restaurant"}
          className="community-button self-end mb-4  mr-2"
        >
          Advertise your business
        </Link>

        <div className="border-2 border-gray-300 mx-2 rounded-xl p-2 w-full">
          <Suspense fallback={<CardsLoader />}>
            <RestaurantsDisplay />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
