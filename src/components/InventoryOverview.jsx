import React from "react";

const InventoryOverview = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold ">Inventory Overview</h2>
      <div className="shadow-md bg-white rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold">
          Inventory by Facility
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 place-content-center gap-4">
            <h4 className="text-sm font-semibold text-gray-500">Facility</h4>
            <h4 className="text-sm font-semibold text-gray-500">2 CuM</h4>
            <h4 className="text-sm font-semibold text-gray-500">4 CuM</h4>
            <h4 className="text-sm font-semibold text-gray-500">7 CuM</h4>
            <h4 className="text-sm font-semibold text-gray-500">Total</h4>
          </div>
        </h3>
      </div>
      <div className="shadow-md bg-white rounded-lg p-4 mt-6">
        <h3 className="text-xl font-semibold">Status Distribution</h3>
        <p className="p-4 text-center text-gray-500 h-[250px]">No result</p>
      </div>{" "}
    </div>
  );
};

export default InventoryOverview;
