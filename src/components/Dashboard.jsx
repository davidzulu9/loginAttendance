import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const handleLogAttendance = () => {
        console.log('Logging Attendance...');
        alert('Attendance Logged!');
        //TODO: Add geo-fencing logic
        //1. Get user current location
        //2. check if location is within geo-fence
        //3. send attendance data to firestore
    };

    const handleExportToExcel = () => {
        //TODO: Fetch data from Firestore

        console.log('Exporting data to Excel...');
        alert('Exporting data to Excel!');
    };

    return(
        <div style={dashboardStyles.container}>
            <Sidebar />

            <div style={dashboardStyles.mainContent}>
                <h2  style={dashboardStyles.heading}>Dashboard</h2>
                <p>Welcome to your dashboard! Here you can manage your attendance</p>

                <div style={dashboardStyles.section}>
                    <h3 style={dashboardStyles.subHeading}>Geo-fencing Area</h3>
                    <p>This section will display maps or indicators related to geo-fencing zones</p>
                    <div style={dashboardStyles.geoFencingPlaceholder}>
                        <p>Map/Geo-fence visualization</p>
                    </div>
                </div>

                <div style={dashboardStyles.section}>
                    <h3 style={dashboardStyles.subHeading}>Attendance</h3>
                    <button onClick={handleLogAttendance} style={dashboardStyles.attendanceButton}>
                        Log Attendance
                    </button>
                    <p style={{marginTop: '10px', fontSize: '0.9em', color: '#666'}}>

                    </p>
                </div>

                <div style={dashboardStyles.section}>
                    <h3 style={dashboardStyles.subHeading}>Data Export</h3>
                    <button onClick={handleExportToExcel} style={dashboardStyles.exportButton}>
                        Export Attendance to Excel
                    </button>
                    <p style={{marginTop: '10px', fontSize: '0.9em', color: '#666' }}>

                    </p>
                </div>
            </div>
        </div>
    );
};

const dashboardStyles = {
    container: {
        display: 'flex',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    mainContent: {
        marginLeft: '220px',
        padding: '40px',
        flexGrow: 1,
        fontFamily: 'Arial, san-serif',
    },
    heading: {
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5em',
    },
    subHeading: {
        color: '#555',
        marginBottom: '15px',
        fontSize: '1.8em',
        borderBottom: '1px solid #eee',
        paddingBottom: '5px',
    },
    section: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        marginBottom: '30px',
    },
    geoFencingPlaceholder: {
        backgroundColor: '#e9ecef',
        border: '1px dashed #ced4da',
        borderRadius: '5px',
        padding: '50px',
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '1.2em',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendanceButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1em',
        transition: 'background-color 0,3s ease',
        '&:hover': {
            backgroundColor: '#218838',
        },
    },
};

export default Dashboard;