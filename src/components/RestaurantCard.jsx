import { IconMapPin } from "@tabler/icons-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const RestaurantCard = ({ _id, name, images }) => {
  const { Cover } = images;
  return (
    <article className={`card ${inter.className}`}>
      <Link
        href={_id ? `/community/advertising/${_id}` : "#"}
        className="flex flex-col h-full"
      >
        <div className="relative max-h-[600px] aspect-[458/299] bg-gray-300 overflow-hidden">
          {Cover && (
            <img
              alt="event cover image"
              src={Cover}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        <div className="flex flex-col px-4 pt-3 pb-12 h-full ">
          <div className="flex flex-row w-full gap-x-2 items-center">
            <img
              alt="event cover image"
              src={Cover}
              className="w-20 h-20 object-cover object-center rounded-full aspect-[1/1] bg-gray-300"
            />

            <div className="flex flex-col ">
              <span className="text-left text-2xl font-bold overflow-ellipsis overflow-hidden break-words ">
                {name || "Title"}
              </span>
              <span className="text-left text-[14px] font-bold text-[#575757]  ml-1 -mt-1">
                Restaurant
              </span>
              <div className="flex flex-row items-center text-[#707070] text-nowrap gap-x-1">
                <IconMapPin size={22} />
                <span className=" text-nowrap overflow-ellipsis overflow-hidden max-w-[203px] ">
                  1,000 meters away
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default RestaurantCard;
