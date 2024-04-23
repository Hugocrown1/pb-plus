import DeleteButton from "@/app/community/advertising/[id]/DeleteButton";
import Image from "next/image";
import { IconPencil, IconPhoneFilled } from "@tabler/icons-react";
import BackButton from "@/app/community/events/[id]/BackButton";
import Link from "next/link";
import dateFormatter from "@/lib/dateFormatter";
import InterestedUserButton from "@/components/InterestedUserButton";

const EventPage = async ({ params: { id } }) => {
  const session = await auth();
  const eventInfo = await getEvent(id);

  return (
    <main className={`bg-[#f5f3f4]  pt-[60px] `}>
      <div className="w-full  mt-4 xl:flex  hidden">
        <BackButton />
      </div>
      <div className="container-2xl">
        <div className="flex flex-col w-full">
          <section className="relative  w-full md:h-[515px] h-[350px] my-4">
            <div
              className={`flex items-end justify-end relative w-full h-full rounded-lg overflow-hidden p-2`}
            >
              <div className="bg-white rounded-lg p-1 absolute w-52 z-10">
                <InterestedUserButton
                  eventId={eventInfo._id}
                  isUserInterested={isUserInterested}
                  userSession={session?.user}
                />
              </div>
              <Image
                src={eventInfo.coverImage}
                alt="property photo"
                fill={true}
                sizes="(min-width: 1120px) 1500px"
                className="object-cover object-center"
              />
            </div>
          </section>
          <div className="h-fit lg:grid grid-cols-3 my-[10px] gap-2 flex flex-col">
            <section className="bg-white p-[20px] col-span-2 shadow-lg lg:order-first order-last">
              <div className="flex xl:flex-row w-full flex-col justify-between">
                <h1 className="text-left md:-my-1 md:text-[40px] text-[32px] xl:order-first order-last">
                  {eventInfo?.title}
                </h1>
                <div className="xl:order-last order-first">
                  {session?.user.id === eventInfo.user._id ? (
                    <div className="flex xl:flex items-center gap-2 justify-between">
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
              </div>
              <h3 className="md:text-[32px] text-2xl">Description</h3>
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
                <div className="flex flex-col text-center ml-2">
                  <p className="font-bold opacity-50 text-center">
                    INTERESTED USERS
                  </p>
                  <p>{eventInfo.interested.length}</p>
                </div>
              </div>
            </section>
            <section className="md:flex flex-col bg-white items-start px-4 py-2 shadow-lg xl:h-[175px] md:w-[480px] rounded-sm">
              <p className="text-[#656b69] text-lg">Host info</p>

              <div className="flex flex-row items-center gap-6 w-full my-auto">
                <img
                  src={eventInfo.user.image}
                  alt="seller photo"
                  className="object-cover object-center xl:w-[100px] w-[70px] aspect-square rounded-full"
                />

                <div className="flex flex-col w-full text-left">
                  <p className="text-xl font-semibold">{eventInfo.user.name}</p>
                  <p className="text-base text-[#656b69]">Member</p>
                  <div className="flex flex-row items-center justify-center gap-1 w-full border-[1px] border-[#255748] text-[#255748] hover:bg-[#ddeee5] rounded-xl py-2 px-4 mt-2">
                    <IconPhoneFilled /> <p>{eventInfo.user.phone}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className="w-full mb-10">
            <h2 className="text-left md:text-[32px] text-2xl">Gallery</h2>
            <div className="grid grid-flow-row xl:grid-cols-4 grid-cols-2 gap-2 w-full self-center mt-2">
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
