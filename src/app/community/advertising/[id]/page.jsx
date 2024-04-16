import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getRestaurant } from "@/lib/restaurants";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const Page = async ({ params: { id } }) => {
  const session = await auth();
  const restaurantInfo = await getRestaurant(id);

  if (!restaurantInfo) {
    redirect("/community/advertising");
  }
  return (
    <main>
      <section className="relative flex items-end justify-center w-full h-[710px] overflow-hidden shadow-md">
        <Image
          priority
          alt={"cover image"}
          src={restaurantInfo.images.Cover}
          fill={true}
          sizes="(min-width: 1120px) 1920px"
          className={`object-cover object-center duration-[10000ms]}`}
        />
        <div className=" absolute h-full w-full flex justify-center items-center">
          <h1 className=" text-white ">{restaurantInfo.name}</h1>
        </div>
        {session?.user.id === restaurantInfo.user._id && (
          <div className="absolute right-0 m-2 p-2 rounded-md flex flex-row gap-2 bg-white">
            <Link
              href={`/community/advertising/edit-restaurant/${restaurantInfo._id}`}
              className="community-button"
            >
              <p>Edit Restaurant</p>
            </Link>
            <DeleteButton />
          </div>
        )}
      </section>
      <section className="w-full h-[550px] bg-[#E7E1E4]">
        <div className=" flex container-xl h-full justify-center">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col max-w-[560px] min-w-[560px] justify-center">
              <h2 className="text-start font-bold">About Us</h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <p className="mt-2">{restaurantInfo.information.AboutUs}</p>
            </div>
            <div className="w-[630px] h-[360px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"about us image"}
                src={restaurantInfo.images.AboutUs}
                fill={true}
                sizes="630px"
                className={`object-cover object-center`}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[960px]">
        <div className="container-xl flex justify-center items-center h-full">
          <h2 className="text-start font-bold">Meet Us</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="h-[800px] w-full grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-4 mt-5 ">
            <div className="relative rounded-md overflow-hidden row-span-2">
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
        <div className=" flex container-xl h-full justify-center">
          <div className="flex flex-row gap-10 items-start">
            <div className="w-[630px] h-[630px] relative rounded-md overflow-hidden">
              <Image
                priority
                alt={"custom section image"}
                src={restaurantInfo.images.CustomSection}
                fill={true}
                sizes="630px"
                className={`object-cover object-center`}
              />
            </div>
            <div className="flex flex-col max-w-[560px] justify-center">
              <h2 className="text-start font-bold">
                {restaurantInfo.sectionTitle}
              </h2>
              <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
              <p className="mt-2">{restaurantInfo.information.CustomSection}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[660px]">
        <div className="container-xl flex flex-col items-center h-full">
          <h2 className="text-start font-bold mt-14">Our social media</h2>
          <div className="rounded-md h-[8px] bg-[#0077B6] w-[80px]"></div>
          <div className="grid grid-flow-col w-full justify-items-center mt-10">
            {Object.entries(restaurantInfo.socialMedia).map(
              ([socialMediaName, socialMediaValue]) => (
                <Link
                  href={socialMediaValue}
                  className="w-[300px] aspect-square rounded-full bg-[#D9D9D9] flex items-center justify-center"
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
