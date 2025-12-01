import React from "react";
import { FaPlus } from "react-icons/fa6";

const CylinderManagement = () => {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-6 space-x-4">
        <h2 className="text-2xl font-semibold ">Cylinder Management</h2>
        <button className="flex space-x-2 items-center bg-[#0097b2] text-white px-4 py-2 rounded-md ">
          <FaPlus className="" />
          <span>Add Cylinder</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 shadow-md p-4 bg-white rounded-lg">
        <label className="flex flex-col">
          <input
            type="text"
            placeholder="Search by ID or Serial Number"
            className="border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2] outline-none"
          />
        </label>
        <label className="flex flex-col">
          <select className="border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2] outline-none">
            <option value="">All types</option>
            <option value="oxygen">2CuM</option>
            <option value="nitrogen">4CuM</option>
            <option value="nitrogen">4CuM</option>
          </select>
        </label>
        <label className="flex flex-col">
          <select className="border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2] outline-none">
            <option value="">All Status</option>
            <option value="active">Filled</option>
            <option value="inactive">In Use</option>
            <option value="inactive">Empty</option>
          </select>
        </label>
        <button
          type="button"
          className="bg-gray-700  text-white p-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
      <div className="mt-8 flex justify-center items-center h-48 bg-white rounded-lg">
        <p className="text-gray-400">No result found</p>
      </div>
    </div>
  );
};

export default CylinderManagement;
