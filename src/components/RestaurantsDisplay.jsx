import { connectDB } from "@/lib/mongoose";
import Events from "@/models/events";
import RestaurantCard from "./RestaurantCard";
import Restaurants from "@/models/restaurants";

const getRestaurants = async () => {
  await connectDB();
  const response = await Restaurants.find().lean();

  return response;
};

export default async function RestaurantsDisplay() {
  const restaurants = await getRestaurants();
  return (
    <div className="grid lg:grid-cols-3 min-[677px]:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-2 justify-items-center">
      {restaurants.map((item) => {
        const formattedRestaurant = {
          ...item,
          _id: item._id.toString(),
          user: item.user.toString(),
        };
        return (
          <RestaurantCard
            key={formattedRestaurant._id}
            {...formattedRestaurant}
          />
        );
      })}
    </div>
  );
}
