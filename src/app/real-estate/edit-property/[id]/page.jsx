import PropertyForm from "@/components/PropertyForm";
import { getProperty } from "@/lib/properties";
import { redirect } from "next/navigation";

const page = async ({ params: { id } }) => {
  const propertyInfo = await getProperty(id);

  if (propertyInfo.user !== session.user.id) {
    redirect("/real-estate/houses-&-properties");
  }

  return (
    <main className="container-xl bg-[#f5f3f4]">
      {propertyInfo && <PropertyForm {...propertyInfo} />}
    </main>
  );
};

export default page;
