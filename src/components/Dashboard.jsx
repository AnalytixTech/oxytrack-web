import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { PiCylinderLight } from "react-icons/pi";
import { FcInspection } from "react-icons/fc";
import { RiBuildingLine } from "react-icons/ri";

const DashboardSection = ({ title, number, icon, border, color }) => {
  return (
    <section
      className={` w-full px-6 py-4 rounded-lg shadow-md bg-white flex justify-between items-center space-x-4 border-l-4 ${border}`}
    >
      <div>
        <h2 className="text-gray-400 text-sm">{title}</h2>

        <p className="text-4xl font-semibold">{number}</p>
      </div>
      <p className={`text-2xl font-bold ${color} rounded-full p-4`}>{icon}</p>
    </section>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section className="w-full p-4 ">
      <header className="hidden  md:flex md:justify-self-end">
        <p className="text-sm text-gray-600">Welcome {user?.username}</p>
      </header>
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardSection
            title="Active Cylinders"
            number={0}
            icon={<PiCylinderLight />}
            border="border-l-[#0097b2]"
            color="text-[#0097b2]"
          />
          <DashboardSection
            title="Due for Inspections"
            number={0}
            icon={<FcInspection />}
            border="border-l-yellow-500"
            color="text-yellow-500"
          />
          <DashboardSection
            title="Active Facilities"
            number={0}
            icon={null}
            border="border-l-green-500"
            color="text-green-500"
          />
        </div>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="flex justify-between items-center w-full my-4 space-x-4">
            <button
              type="button"
              className="bg-[#0097b2] text-white px-4 py-3 rounded-md w-[300px] flex justify-center items-center"
            >
              <span>Add Cylinder</span>
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white px-4 py-3 rounded-md w-[300px]"
            >
              <span>Scan Cylinders</span>
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-3 rounded-md w-[300px]"
            >
              View Alert
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold">Status Distribution</h3>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold">Recent Activity</h3>
            <p className="text-sm">No recent activity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
