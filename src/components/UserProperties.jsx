import users from "@/lib/users";
import PropertyCard from "./PropertyCard";

const UserProperties = async ({ user }) => {
  const { properties } = await users.getUser(user.id);

  return (
    <div className="flex flex-wrap gap-4">
      {properties.map((property) => (
        <PropertyCard {...property} />
      ))}
    </div>
  );
};

export default UserProperties;
