import { auth } from "@/app/api/auth/[...nextauth]/route";
import PropertyForm from "@/components/PropertyForm";
import { getProperty } from "@/lib/properties";
import { redirect } from "next/navigation";

const page = async ({ params: { id } }) => {
  const propertyInfo = await getProperty(id);
  const session = await auth();

  if (propertyInfo.user._id !== session.user.id) {
    redirect("/real-estate/houses-&-properties");
  }

  return (
    <main className="container-xl bg-[#f5f3f4]">
      {propertyInfo && <PropertyForm {...propertyInfo} />}
    </main>
  );
};

export default page;
