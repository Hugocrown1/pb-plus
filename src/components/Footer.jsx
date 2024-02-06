import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A100D] w-full h-[408px]">
      <div className="flex max-w-[1280px] mx-auto px-[80px]">
        <div className="grid grid-cols-3 w-full">
          <section className="flex flex-col h-full py-[48px] gap-2">
            <h3 className="text-lg text-[#f5f3f4] text-[22px] font-semibold">
              Demo creado por:
            </h3>
            <ul className="text-lg text-[#f5f3f4] text-[18px] flex flex-col gap-1">
              <li>Hugo Corona</li>
              <li>Diego Rulfo</li>
              <li>Alan Ulloa</li>
              <li>Tony Vazquez</li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
