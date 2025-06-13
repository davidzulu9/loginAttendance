import React from "react";
import { Link } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onLogout }) => {
  // const { logout } = useAuth();

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.sidebarHeader}>Dashboard</h3>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/dashboard" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/dashboard/profile" style={styles.navLink}>
            Profile
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/dashboard/settings" style={styles.navLink}>
            Settings
          </Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={onLogout} style={styles.logoutButton}>
            Logout
          </button>{" "}
          {/* Use the passed prop */}
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#343a40",
    color: "white",
    padding: "20px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  sidebarHeader: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#f8f9fa",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    marginBottom: "15px",
  },
  navLink: {
    color: "#adb5bd",
    textDecoration: "none",
    fontSize: "1.1em",
    display: "block",
    padding: "8px 0",
    transition: "color 0.3s ease",
    "&:hover": {
      // This is a conceptual hover style, not directly applied by JS objects
      // For actual hover, you'd use a CSS class or styled-components
    },
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1em",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      // Same as above, for real hover, use CSS
    },
  },
};

export default Sidebar;
