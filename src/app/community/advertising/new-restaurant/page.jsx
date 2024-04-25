import NoSubscriptionPage from "@/components/NoSubscriptionPage";
import RestaurantEditor from "@/components/RestaurantEditor";
import { getSubscription } from "@/lib/stripe";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import Users from "@/models/users";
import { connectDB } from "@/lib/mongoose";
import { redirect } from "next/navigation";

const getUser = async (id) => {
  await connectDB();
  const user = await Users.findById(id).lean();
  user._id = user._id.toString();

  return user;
};

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  const user = await getUser(session.user.id);

  if (user.advertisements?.length > 0) {
    return redirect("/community/advertising/" + user.advertisements[0]);
  }

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
