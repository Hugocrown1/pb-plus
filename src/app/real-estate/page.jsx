import CustomPage from "@/components/CustomPage";

export default function Page() {
  return (
    <main className="bg-[#f5f3f4]">
      <CustomPage
        title="PB+ REAL ESTATE"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in."
        buttonText="Take a look"
        imageUrl="https://i.imgur.com/YG4dndi.jpeg"
      />
      <div className="flex flex-row w-full px-[40px] mx-auto  h-[800px] my-8 gap-4">
        <section className="min-w-[240px] bg-white"></section>
        <section className="grid grid-cols-4 grid-rows-2 gird w-full gap-4 ">
          <div className="bg-white w-full h-full"></div>
          <div className="bg-white w-full h-full"></div>
          <div className="bg-white w-full h-full"></div>
          <div className="bg-white w-full h-full"></div>
        </section>
      </div>
    </main>
  );
}
