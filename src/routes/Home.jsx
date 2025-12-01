import React from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Home;
