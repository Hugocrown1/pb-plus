import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getRestaurant } from "@/lib/restaurants";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import GridGallery from "@/components/GridGallery";

import { IconMapPin, IconPencil, IconPinFilled } from "@tabler/icons-react";
import BackButton from "./BackButton";

import { getUserSubscription } from "@/lib/stripe";

import { redirect } from "next/navigation";

const Page = async ({ params: { id } }) => {
  const session = await auth();
  const restaurantInfo = await getRestaurant(id);

  if (!restaurantInfo) {
    redirect("/community/advertising");
  }

  const ownerSubscription = await getUserSubscription(restaurantInfo.user._id);

  if (
    (!session && !ownerSubscription && restaurantInfo.user.role !== "admin") ||
    (session &&
      session.user.role !== "admin" &&
      session.user.id !== restaurantInfo.user._id &&
      !ownerSubscription &&
      restaurantInfo.user.role !== "admin")
  ) {
    redirect("/community/advertising");
  }

  const socialMediaIcons = {
    Facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        fill="url(#a)"
        height="full"
        width="full"
      >
        <defs>
          <linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a">
            <stop offset="0%" stopColor="#616161" />
            <stop offset="100%" stopColor="#616161" />
          </linearGradient>
        </defs>
        <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
        <path
          fill="#FFF"
          d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
        />
      </svg>
    ),
    Instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="full"
        height="full"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 256"
      >
        <path
          fill="#616161"
          d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
        />
      </svg>
    ),
    Twitter: (
      <svg
        viewBox="0 0 256 209"
        width="full"
        height="full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
          fill="#616161"
        />
      </svg>
    ),
  };

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
            <DeleteButton id={restaurantInfo._id} />
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

      {Object.entries(restaurantInfo.socialMedia).some(
        ([, socialMediaValue]) => socialMediaValue.trim() !== ""
      ) && (
        <section className="w-full xl:h-[660px] h-[300px]">
          <div className="container-xl flex flex-col items-center h-full">
            <h2 className="text-start font-bold mt-14">Our social media</h2>
            <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
            <div className="grid grid-flow-col w-full justify-items-center mt-10">
              {Object.entries(restaurantInfo.socialMedia)
                .filter(
                  ([socialMediaName, socialMediaValue]) =>
                    socialMediaValue.trim() !== ""
                )
                .map(([socialMediaName, socialMediaValue]) => {
                  const href =
                    socialMediaValue.startsWith("http://") ||
                    socialMediaValue.startsWith("https://")
                      ? socialMediaValue
                      : `https://${socialMediaValue}`;
                  return (
                    <Link
                      key={socialMediaName}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="xl:w-[250px] w-[100px] aspect-square rounded-full flex flex-col items-center justify-center"
                    >
                      {socialMediaIcons[socialMediaName]}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Page;
