import React from 'react'
import InspectionAlerts from '../components/InspectionAlerts'
import Sidebar from "../components/Sidebar";

function Inspection() {
  return (
    <div className="flex min-h-screen">
              <Sidebar />
        <InspectionAlerts/>
    </div>
  )
}

export default Inspection