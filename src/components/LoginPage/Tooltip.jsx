// Tooltip.js
import React from "react";

const Tooltip = ({ children, message }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute w-32 p-2 mt-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-black rounded-md opacity-0 left-1/2 group-hover:opacity-100">
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
