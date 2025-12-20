import React from "react";

const ScanTab = ({ tabs, title }) => {
  return (
    <div className="">
      <div className='flex items-center space-x-2"'>
        <div className="w-8 h-8 bg-[#0097b2] rounded-full flex justify-center items-center">
          <span className="text-white text-sm">{tabs}</span>
        </div>{" "}
        <div className="bg-gray-300 w-20 h-1 mx-2 rounded-2xl"></div>
      </div>
      <p className="text-sm my-2 text-gray-500">{title}</p>
    </div>
  );
};

export default ScanTab;
