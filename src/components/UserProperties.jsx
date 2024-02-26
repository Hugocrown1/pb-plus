import users from "@/lib/users";
import PropertyCard from "./PropertyCard";

const UserProperties = async ({ user }) => {
  const { properties } = await users.getUser(user?.id);

  return (
    <div className=" flex-wrap ">
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </div>
  );
};

export default UserProperties;
