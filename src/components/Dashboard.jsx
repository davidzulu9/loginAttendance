import { useState } from "react";
import Sidebar from "./Sidebar";
import AttendanceTable from "./AttendanceTable";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome! Click the button below to log attendance.</p>
        <button>Log Attendance</button>

        <h2 style={{ marginTop: "20px" }}>Attendance Log</h2>
        <AttendanceTable />
      </div>
    </div>
  );
}
