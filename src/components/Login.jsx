import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        //TODO: Add authentication and use Firebase Auth here
        console.log('Login sucessful');
        //TODO: Redirect the user
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input type="email" id="email" name="email" style={styles.input} required></input>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input type="password" id="password" name="password" style={styles.input} required></input>
                </div>
                <button type="submit" style={styles.button}>Login</button>
                <p style={styles.linkText}>Don't have an account? <Link to="/Register" style={styles.link}>Register Here</Link></p>
            </form>
            
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignmentItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor:' #f0f2f5',
        fontFamily: 'Arial, san-serif',
    },
    heading: {
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#0076ff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
    },
    linkText: {
        marginTop: '20px',
        textDecoration: 'none',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Login;