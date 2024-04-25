import NoSubscriptionPage from "@/components/NoSubscriptionPage";
import RestaurantEditor from "@/components/RestaurantEditor";
import { getSubscription } from "@/lib/stripe";

const page = async () => {
  const subscription = await getSubscription();
  if (!subscription) {
    return <NoSubscriptionPage />;
  }
  return (
    <main>
      <RestaurantEditor />
    </main>
  );
};

export default page;
