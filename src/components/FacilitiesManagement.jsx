import React from "react";
import { FaPlus } from "react-icons/fa";

const FacilitiesManagement = () => {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-6 space-x-4">
        <h2 className="text-2xl font-semibold ">Facility Management</h2>
        <button className="flex items-center space-x-2 bg-[#0097b2] text-white px-4 py-2 rounded-md ">
          <FaPlus />
          <span>Add Facility</span>
        </button>
      </div>
    </div>
  );
};

export default FacilitiesManagement;
