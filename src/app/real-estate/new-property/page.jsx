import FormInput from "@/components/FormInput";
import React from "react";

const page = () => {
  return (
    <main className="bg-[#f5f3f4]">
      <div className="container-xl h-[800px]">
        <div className="flex flex-row w-full h-full gap-10">
          <section className="w-[80%] flex flex-col ">
            <h1 className="text-left text-[48px]">New property</h1>
            <div className="bg-white w-full flex p-6">
              <form action="submit">
                <FormInput />
              </form>
            </div>
          </section>
          <section className="w-[20%] flex flex-col ">
            <h1 className="text-left text-[48px]">Preview</h1>
            <div className="bg-white">preview</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
