import { getEvent } from "@/lib/events";

import DeleteButton from "./DeleteButton";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { IconPencil, IconPhoneFilled } from "@tabler/icons-react";
import BackButton from "./BackButton";
import Link from "next/link";
import dateFormatter from "@/lib/dateFormatter";

const EventPage = async ({ params: { id } }) => {
  const session = await auth();
  const eventInfo = await getEvent(id);

  return (
    <main className={`bg-[#f5f3f4]  xl:pt-[50px] `}>
      <div className="w-full bg-white h-[70px] flex flex-row items-center">
        <BackButton />
        <p>Back</p>
      </div>
      <div className="container-2xl">
        <div className="flex flex-col w-full">
          <section className="relative  w-full md:h-[515px] h-[350px] my-4">
            <div
              className={`relative w-full h-full rounded-lg overflow-hidden`}
            >
              <Image
                src={eventInfo.coverImage}
                alt="property photo"
                fill={true}
                sizes="(min-width: 1120px) 1500px"
                className="object-cover object-center"
              />
            </div>
          </section>
          <div className="h-fit grid grid-cols-3 my-[10px] gap-2">
            <section className="bg-white p-[20px] col-span-2 shadow-lg">
              <div className="flex flex-row w-full ">
                <h2 className="text-start flex-1 font-bold">
                  {eventInfo.title}
                </h2>
                {session?.user.id === eventInfo.user._id ? (
                  <div className="flex flex-row gap-2">
                    <Link
                      href={`/community/events/edit-event/${eventInfo._id}`}
                      className="community-button"
                    >
                      <IconPencil />
                      <p>Edit</p>
                    </Link>
                    <DeleteButton id={id} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <h2 className="text-start mt-2">Description</h2>
              <p className="min-h-10">{eventInfo.description}</p>
              <hr className="w-full my-2" />
              <div className="flex items-center mt-7 ">
                <div className="flex flex-col mx-auto ml-0">
                  <p className="font-bold opacity-50 text-center">ADDRESS</p>
                  <p>{eventInfo.address}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold opacity-50 text-center">DATE</p>
                  <p>{dateFormatter(eventInfo.date)}</p>
                </div>
              </div>
            </section>
            <section className="bg-white p-[20px] flex flex-col shadow-lg h-fit">
              <h2 className="text-start">Host info</h2>
              <div className="flex flex-row items-center gap-6 w-full my-auto mt-2">
                <img
                  src={eventInfo.user.image}
                  alt="host photo"
                  className="object-cover object-center w-[70px] aspect-square rounded-full"
                />

                <div className="flex flex-col w-full text-left">
                  <p className="text-xl font-semibold">{eventInfo.user.name}</p>
                  <p className="text-base text-[#656b69]">Member</p>
                  <div className="flex flex-row items-center justify-center gap-1 w-full border-[1px] border-[#255748] text-[#255748] hover:bg-[#ddeee5] rounded-xl px-4 py-1">
                    <IconPhoneFilled /> <p>{eventInfo.user.phone}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className="w-full mb-10">
            <h2 className="text-start">Gallery</h2>
            <div className="grid grid-flow-row grid-cols-4 gap-2 w-full self-center">
              {eventInfo.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="event photo"
                  className=" object-cover object-center w-full rounded-md aspect-square"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default EventPage;
