import RestaurantCard from "./RestaurantCard";

const UserAdvertisements = async ({ advertisements }) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2 self-start">
      {advertisements.map((advertisement) => {
        const formattedAdvertisement = {
          ...advertisement,
          _id: advertisement._id.toString(),
          user: advertisement.user.toString(),
        };

        return (
          <RestaurantCard
            key={formattedAdvertisement._id}
            {...formattedAdvertisement}
          />
        );
      })}
    </div>
  );
};

export default UserAdvertisements;
