import React from "react";
import Sidebar from "../components/Sidebar";
import InventoryOverview from "../components/InventoryOverview";

const Inventory = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <InventoryOverview />
    </div>
  );
};

export default Inventory;
