import React from "react";

const LegalCard = ({ children, title, icon, style }) => {
  return (
    <article className={`group  ${style} overflow-hidden text-center`}>
      <div className="relative flex w-full h-full items-center justify-center text-2xl">
        <div className="flex flex-col z-10 px-4 items-center justify-center">
          <div className="p-4 rounded-full ">{icon}</div>
          <p className="font-semibold ">{title}</p>
          <p className="text-base font-light text-[#5e5e5e] ">{children}</p>
        </div>
      </div>
    </article>
  );
};

export default LegalCard;
