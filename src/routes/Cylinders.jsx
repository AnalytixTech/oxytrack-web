import React from "react";
import Sidebar from "../components/Sidebar";
import CylinderManagement from "../components/CylinderManagement";

const Cylinders = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <CylinderManagement />
    </div>
  );
};

export default Cylinders;
