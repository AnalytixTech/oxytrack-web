import React from "react";
import ScanTab from "./ScanTab";
const ScanDialog = () => {
  return (
    <div className="shadow-md bg-white rounded-lg p-6 mt-6 max-w-xl mx-auto">
      <div className="flex justify-center flex-col">
        <h2 className="mb-2">Cylinder ID</h2>
        <div>
          <label>
            <input type="text" placeholder="Enter or scan cylinder ID" />
          </label>
        </div>

        <button className=" mt-6 flex justify-center items-center space-x-2 bg-[#0097b2] text-white px-4 py-2 rounded-md ">
          Next
        </button>
      </div>
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
    </div>
  );
};

export default ScanEntry;
