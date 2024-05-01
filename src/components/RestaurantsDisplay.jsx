import { connectDB } from "@/lib/mongoose";
import Events from "@/models/events";
import RestaurantCard from "./RestaurantCard";
import Restaurants from "@/models/restaurants";
import { getAllSubscriptions } from "@/lib/stripe";
import { IconFileSad } from "@tabler/icons-react";

const getRestaurants = async () => {
  await connectDB();
  const response = await Restaurants.find().populate("user").lean();

  return response;
};

export default async function RestaurantsDisplay() {
  const restaurants = await getRestaurants();
  const subscriptions = await getAllSubscriptions();

  const restaurantsWithActiveSubscriptions = restaurants.reduce(
    (acc, restaurant) => {
      if (restaurant.user.role === "admin") return acc.concat(restaurant);
      const subscription = subscriptions.find(
        (subscription) =>
          subscription.customer === restaurant.user.stripe_customer_id
      );
      if (subscription) {
        return acc.concat(restaurant);
      }
      return acc;
    },
    []
  );

  return (
    <>
      {restaurantsWithActiveSubscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center  w-full h-[876px] text-gray-600 text-center">
          <IconFileSad size={70} />
          <p className="font-medium text-3xl text-wrap">
            No advertisements found.
          </p>
        </div>
      )}

      {!!restaurantsWithActiveSubscriptions.length && (
        <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
          {restaurantsWithActiveSubscriptions.map((item) => {
            const formattedRestaurant = {
              ...item,
              _id: item._id.toString(),
              user: item.user._id.toString(),
            };
            return (
              <RestaurantCard
                key={formattedRestaurant._id}
                {...formattedRestaurant}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
