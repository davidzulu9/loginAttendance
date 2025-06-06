import "./Sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "☰" : "☰"}
      </button>
      {isOpen && (
        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Log Attendance</a></li>
          <li><a href="#">Attendance Table</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      )}
    </div>
  );
}
