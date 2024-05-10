import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getRestaurant } from "@/lib/restaurants";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import GridGallery from "@/components/GridGallery";
import { IconMapPin, IconPencil, IconPinFilled } from "@tabler/icons-react";
import BackButton from "./BackButton";

const Page = async ({ params: { id } }) => {
  const session = await auth();
  const restaurantInfo = await getRestaurant(id);

  if (!restaurantInfo) {
    redirect("/community/advertising");
  }
  return (
    <main>
      <section className="relative flex items-end justify-center w-full xl:h-[710px] min-h-[710px] overflow-hidden shadow-md">
        <Image
          priority
          alt={"cover image"}
          src={restaurantInfo.images.Cover}
          fill={true}
          className={`object-cover object-center duration-[10000ms]}`}
        />
        <div className="absolute bg-black opacity-50 w-full h-full"></div>
        <div className=" absolute h-full w-full flex justify-center items-center">
          <div className="w-full absolute mt-4 left-0 top-0 pt-[60px] xl:flex hidden">
            <BackButton />
          </div>
          <div className="flex xl:flex-row flex-col xl:gap-10 gap-2 justify-center items-center">
            <div className="relative w-52 h-52 rounded-full overflow-hidden">
              <Image
                priority
                alt={"profile image"}
                src={restaurantInfo.images.Profile}
                fill={true}
                className={`object-cover object-center`}
              />
            </div>
            <div className="flex flex-col justify-center items-center xl:p-0 p-2">
              <h1 className=" text-white ">{restaurantInfo.name}</h1>
              <h3 className="text-white text-2xl">{restaurantInfo.category}</h3>
            </div>
          </div>
        </div>
        {session?.user.id === restaurantInfo.user._id && (
          <div className="absolute xl:right-0 xl:bottom-0 xl:m-2 m-20 p-2 rounded-md flex flex-row gap-2 bg-white">
            <Link
              href={`/community/advertising/edit-restaurant/${restaurantInfo._id}`}
              className="community-button"
            >
              <IconPencil />
              <p>Edit</p>
            </Link>
            <DeleteButton />
          </div>
        )}
        <div className="flex flex-row gap-2 justify-center items-center xl:absolute left-0 bottom-0 m-5 text-white text-2xl z-10">
          <IconMapPin />
          {restaurantInfo.address}
        </div>
      </section>
      <section className="w-full h-[550px] bg-[#E7E1E4]">
        <div className="flex container-xl p-5 xl:p-0 h-full justify-center items-center">
          <div className="grid grid-cols-2 w-full gap-7">
            <div className="flex flex-col justify-center">
              <h2 className="text-start font-bold">About Us</h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <p className="mt-2 text-justify max-h-[550px]">
                {restaurantInfo.information.AboutUs}
              </p>
            </div>
            <div className="xl:h-[360px] h-[200px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"about us image"}
                src={restaurantInfo.images.AboutUs}
                fill={true}
                className={`object-cover object-center`}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[960px]">
        <div className="container-xl p-5 xl:p-0 flex justify-center items-center h-full">
          <h2 className="text-start font-bold">Meet Us</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="h-[800px] w-full grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-4 mt-5 ">
            <div className="relative rounded-md overflow-hidden xl:row-span-2 xl:col-span-1 col-span-2">
              <Image
                priority
                alt={"meet us image 1"}
                src={restaurantInfo.images.MeetUs1}
                fill={true}
                className={`object-cover object-center`}
              />
            </div>
            <div className="relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"meet us image 2"}
                src={restaurantInfo.images.MeetUs2}
                fill={true}
                className={`object-cover object-center`}
              />
            </div>
            <div className="relative rounded-md overflow-hidden h-[300px]">
              <Image
                priority
                alt={"meet us image 3"}
                src={restaurantInfo.images.MeetUs3}
                fill={true}
                className={`object-cover object-center`}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[730px] bg-[#E7E1E4]">
        <div className="flex container-xl p-5 xl:p-0 h-full justify-center">
          <div className="grid grid-cols-2 gap-7">
            <div className="xl:h-[630px] h-[200px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"custom section image"}
                src={restaurantInfo.images.CustomSection}
                fill={true}
                sizes="630px"
                className={`object-cover object-center`}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-start font-bold">
                {restaurantInfo.sectionTitle}
              </h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <p className="mt-2 text-justify">
                {restaurantInfo.information.CustomSection}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full xl:h-[900px] h-[500px]">
        <div className="container-xl flex items-center h-full">
          <div className="flex flex-col justify-center items-center mt-10">
            <h2 className="text-start font-bold">Gallery</h2>
            <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          </div>
          <div className="relative xl:w-7/12 w-3/4 flex-1 my-5">
            <GridGallery data={restaurantInfo.images.Gallery} />
          </div>
        </div>
      </section>
      <section className="w-full bg-[#E7E1E4]">
        <div className="container-xl flex items-center h-full p-10">
          <h2 className="text-start font-bold">Weekly Calendar</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="grid xl:grid-cols-7 grid-cols-1 xl:grid-rows-1 grid-rows-7 gap-[1px] w-full min-h-[650px] justify-evenly mt-5 bg-black/5 rounded-md overflow-hidden shadow-md">
            {Object.entries(restaurantInfo.calendar).map(([day, items]) => (
              <div
                className="flex flex-col bg-[#f5f3f4] items-center w-full h-full"
                key={day}
              >
                <div className="flex flex-col w-full justify-center items-center border-b-2 border-black/5 ">
                  <h3 className="text-xl mt-2">{day}</h3>
                </div>
                <ul className="flex-1 w-full text-justify list-none flex flex-col gap-[2px]">
                  {items.map((item, itemIndex) => (
                    <li
                      className=" break-all p-5 bg-[#0077B6] text-white w-full relative text-center "
                      key={itemIndex}
                    >
                      <p className="z-10">{item}</p>
                      <IconPinFilled
                        className="absolute left-0 top-0 opacity-25 z-0"
                        size={50}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full xl:h-[660px] h-[300px]">
        <div className="container-xl flex flex-col items-center h-full">
          <h2 className="text-start font-bold mt-14">Our social media</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="grid grid-flow-col w-full justify-items-center mt-10">
            {Object.entries(restaurantInfo.socialMedia).map(
              ([socialMediaName, socialMediaValue]) => (
                <Link
                  href={socialMediaValue}
                  className="xl:w-[300px] w-[100px] aspect-square rounded-full bg-[#D9D9D9] flex items-center justify-center"
                >
                  <h2>{socialMediaName}</h2>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
