import PropertyCard from "./PropertyCard";

const UserProperties = async ({ properties }) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2 self-start">
      {properties.map((property) => {
        const formattedProperty = {
          ...property,
          _id: property._id.toString(),
          user: property.user.toString(),
        };

        return (
          <PropertyCard key={formattedProperty._id} {...formattedProperty} />
        );
      })}
    </div>
  );
};

export default UserProperties;
