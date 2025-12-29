import React from "react";
import ScanTab from "./ScanTab";
import { IoIosCamera } from "react-icons/io";
import { TbCylinderPlus } from "react-icons/tb";

const ScanDialog = () => {
  return (
    <div className="shadow-md bg-white rounded-lg p-6 mt-6 max-w-xl mx-auto">
      <div className="flex justify-center flex-col">
        <h2 className="mb-2 flex items-center space-x-2">
          <TbCylinderPlus className="text-[#0097b2]" /> <span>Cylinder ID</span>
        </h2>
        <div className="flex justify-between items-center border-1 rounded-md border-gray-400 w-full px-2 py-3">
          <label htmlFor="scanCylinder" className="">
            <input
              type="text"
              placeholder="Enter or scan cylinder ID"
              className=""
            />
          </label>
          <IoIosCamera size="24" className="text-[#0097b2]" />
        </div>
        <p className="text-gray-400 text-sm">
          💡 Tip: Use camera button to scan barcode/QR code
        </p>

        <button className=" mt-6 flex justify-center items-center space-x-2 bg-[#0097b2] text-white px-4 py-2 rounded-md ">
          Next
        </button>
      </div>
    </div>
  );
};
const RecentSearch = () => {
  return (
    <div className="shadow-md bg-white rounded-lg p-6 mt-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
      <p className="text-center text-gray-500">No recent searches</p>
    </div>
  );
};

const ScanEntry = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold  mt-4">Quick Scan Entry </h2>
      <div className="mt-6 flex justify-around items-center  bg-white rounded-lg">
        <ScanTab tabs="1" title="Cylinder ID" />
        <ScanTab tabs="2" title="Location & Status" />
        <ScanTab tabs="3" title="Details" />
      </div>
      <ScanDialog />
      <RecentSearch />
    </div>
  );
};

export default ScanEntry;
