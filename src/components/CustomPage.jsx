import React from "react";

const CustomPage = ({
  title,
  text,
  buttonText,
  imageUrl,
  optionalImageUrl,
}) => {
  return (
    <section className="flex-grow">
      <div className="relative flex items-center justify-center h-[700px] bg-black/10 w-full z-20">
        <div className="flex flex-col gap-4 text-white text-center w-3/4">
          <p className="text-9xl font-bold">{title}</p>
          <p className="text-2xl">{text}</p>
          <div className="flex w-full gap-12 text-xl justify-center items-start font-medium">
            <button className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-[200px] transition-colors text-black border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C]">
              {buttonText}
            </button>
          </div>
        </div>
        {optionalImageUrl && (
          <img src={optionalImageUrl} className="h-full" alt="Optional Image" />
        )}
        <img
          src={imageUrl}
          className="absolute -z-10 object-cover h-full w-full bg-black grayscale"
          alt="Background"
        />
      </div>
    </section>
  );
};

export default CustomPage;
