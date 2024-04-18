import PropertyLoader from "./PropertyLoader";
const CardsLoader = () => {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center xl:gap-4 gap-4">
      <PropertyLoader uniqueKey="1" />
      <PropertyLoader uniqueKey="2" />
      <PropertyLoader uniqueKey="3" />
      <PropertyLoader uniqueKey="4" />
      <PropertyLoader uniqueKey="5" />
      <PropertyLoader uniqueKey="6" />
    </div>
  );
};

export default CardsLoader;
