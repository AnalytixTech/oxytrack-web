import React from "react";
import Sidebar from "../components/Sidebar";
import FacilitiesManagement from "../components/FacilitiesManagement";

const Facilities = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <FacilitiesManagement />
    </div>
  );
};

export default Facilities;
