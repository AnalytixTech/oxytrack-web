import React from "react";
import Sidebar from "../components/Sidebar";
import ScanEntry from "../components/ScanEntry";

const Scan = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <ScanEntry />
    </div>
  );
};

export default Scan;
