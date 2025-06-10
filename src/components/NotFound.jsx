import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 - Page Not Found</h1>
            <p style={styles.text}>The page you are looking for does not exist.</p>
            <Link to="/" style={styles.link}>Go to Login Page</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, san-serif',
        color: '#333',
    },
    heading: {
        fontSize: '3em',
        marginBottom: '20px',
    },
    text: {
        fontSize: '1.2em',
        marginBottom: '30px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '1.1em'
    },
};

export default NotFound