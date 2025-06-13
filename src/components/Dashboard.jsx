import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    currentUser,
    logout,
    logInAttendance,
    logOutAttendance,
    getUserAttendanceRecords,
  } = useAuth();
  const navigate = useNavigate();

  // State to hold all attendance history for the current user
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  // State for the current active attendance record
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [attendanceError, setAttendanceError] = useState("");

  // Function to derive current attendance status from history
  const deriveCurrentAttendanceStatus = (history) => {
    if (!history || history.length === 0) return null;
    const lastRecord = history[history.length - 1];
    return lastRecord && !lastRecord.logoutTime ? lastRecord : null;
  };

  // Effect to update attendance states whenever the context's internal attendance data changes
  useEffect(() => {
    const latestHistory = getUserAttendanceRecords(); // Get the very latest data
    setAttendanceHistory(latestHistory);
    setCurrentAttendance(deriveCurrentAttendanceStatus(latestHistory));
  }, [getUserAttendanceRecords, currentUser]);

  const handleLogAttendanceToggle = async () => {
    setAttendanceError(""); // Clear previous errors
    try {
      if (currentAttendance) {
        // User is currently logged in, so log them out
        await logOutAttendance();
        alert("You have successfully logged out your attendance.");
      } else {
        // User is not logged in, so log them in
        await logInAttendance();
        alert("You have successfully logged in your attendance!");
      }

      // const latestHistory = getUserAttendanceRecords();
      // setAttendanceHistory(latestHistory);
      // setCurrentAttendance(deriveCurrentAttendanceStatus(latestHistory));
    } catch (err) {
      setAttendanceError(err.message);
      console.error("Attendance logging error:", err);
    }
  };

  const handleExportToExcel = () => {
    if (!attendanceHistory || attendanceHistory.length === 0) {
      alert("No attendance data to export.");
      return;
    }

    const headers = "User Email,Login Time,Logout Time\n";
    const csvContent = attendanceHistory
      .map((record) => {
        const login = record.loginTime
          ? record.loginTime.toLocaleString()
          : "N/A";
        const logout = record.logoutTime
          ? record.logoutTime.toLocaleString()
          : "N/A";
        return `${currentUser},"${login}","${logout}"`;
      })
      .join("\n");

    const fullCsv = headers + csvContent;
    const blob = new Blob([fullCsv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `attendance_records_${currentUser}_${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Attendance data exported to CSV!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={dashboardStyles.container}>
      <Sidebar onLogout={handleLogout} />
      <div style={dashboardStyles.mainContent}>
        <h2 style={dashboardStyles.heading}>Dashboard</h2>
        {currentUser && <p>Welcome, {currentUser}!</p>}

        <div style={dashboardStyles.section}>
          <h3 style={dashboardStyles.subHeading}>Attendance Status</h3>
          {attendanceError && (
            <p style={dashboardStyles.errorText}>{attendanceError}</p>
          )}
          <p>
            Current Status:{" "}
            <span
              style={{
                fontWeight: "bold",
                color: currentAttendance ? "green" : "red",
              }}
            >
              {currentAttendance
                ? `Logged In since ${currentAttendance.loginTime.toLocaleTimeString()}`
                : "Not Logged In"}
            </span>
          </p>
          <button
            onClick={handleLogAttendanceToggle}
            style={
              currentAttendance
                ? dashboardStyles.logoutAttendanceButton
                : dashboardStyles.attendanceButton
            }
          >
            {currentAttendance ? "Log Out Attendance" : "Log In Attendance"}
          </button>
        </div>

        <div style={dashboardStyles.section}>
          <h3 style={dashboardStyles.subHeading}>Attendance History</h3>
          {attendanceHistory.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Login Time</th>
                  <th style={dashboardStyles.th}>Logout Time</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr key={index}>
                    <td style={dashboardStyles.td}>
                      {record.loginTime.toLocaleString()}
                    </td>
                    <td style={dashboardStyles.td}>
                      {record.logoutTime
                        ? record.logoutTime.toLocaleString()
                        : "Active Session"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={dashboardStyles.section}>
          <h3 style={dashboardStyles.subHeading}>Data Export</h3>
          <button
            onClick={handleExportToExcel}
            style={dashboardStyles.exportButton}
          >
            Export Attendance to CSV
          </button>
          <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#666" }}>
            (This will export your attendance records to a CSV file.)
          </p>
        </div>

        <div style={dashboardStyles.section}>
          <h3 style={dashboardStyles.subHeading}>Geo-fencing Area</h3>
          <p>
            This section will display maps or indicators related to geo-fencing
            zones.
          </p>
          <div style={dashboardStyles.geoFencePlaceholder}>
            <p>Map/Geo-fence visualization goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const dashboardStyles = {
  container: {
    display: "flex",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  mainContent: {
    marginLeft: "220px",
    padding: "40px",
    flexGrow: 1,
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    marginBottom: "30px",
    fontSize: "2.5em",
  },
  subHeading: {
    color: "#555",
    marginBottom: "15px",
    fontSize: "1.8em",
    borderBottom: "1px solid #eee",
    paddingBottom: "5px",
  },
  section: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px",
  },
  geoFencePlaceholder: {
    backgroundColor: "#e9ecef",
    border: "1px dashed #ced4da",
    borderRadius: "5px",
    padding: "50px",
    textAlign: "center",
    color: "#6c757d",
    fontSize: "1.2em",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  attendanceButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    transition: "background-color 0.3s ease",
  },
  logoutAttendanceButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    transition: "background-color 0.3s ease",
  },
  exportButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    transition: "background-color 0.3s ease",
  },
  errorText: {
    color: "red",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
  },
};

export default Dashboard;
