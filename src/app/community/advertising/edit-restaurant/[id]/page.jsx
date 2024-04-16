import { auth } from "@/app/api/auth/[...nextauth]/route";
import RestaurantEditor from "@/components/RestaurantEditor";
import { getRestaurant } from "@/lib/restaurants";

const Page = async ({ params: { id } }) => {
  const session = await auth();
  const restaurantInfo = await getRestaurant(id);

  if (restaurantInfo.user._id !== session?.user.id) {
    redirect("/community/advertising");
  }
  return (
    <main>{restaurantInfo && <RestaurantEditor {...restaurantInfo} />}</main>
  );
};

export default Page;
