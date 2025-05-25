import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-4 relative">
      <div
        className="bg-[#68217A] h-4 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex justify-center items-center text-xs font-bold text-[#001F3F]">
        {progress}% Selesai
      </span>
    </div>
  );
};

export default ProgressBar;
