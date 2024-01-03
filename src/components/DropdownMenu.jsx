import React from "react";

const DropdownMenu = ({ children, isOpen, ref }) => {
  if (isOpen)
    return (
      <div ref={ref} className="flex flex-col dropdown-menu shadow-sm">
        <ul className="flex flex-col gap-1">{children}</ul>
      </div>
    );
};

export default DropdownMenu;
