import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        //TODO: Add create new user logic here

        console.log('Registration successfully submitted')
    };

    return(
        <div style={styles.container}>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Register</h2>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name: </label>
                    <input type="text" id="name" name="name" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email: </label>
                    <input type="email" id="email" name="email" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="nrc" style={styles.label}>NRC: </label>
                    <input type="text" id="nrc" name="nrc" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password: </label>
                    <input type="password" id="password" name="password" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="confirmPassword" style={styles.label}>ConfirmPassword: </label>
                    <input type="password" id="confirmPassword" name="confirmPassword" style={styles.input} required />
                </div>
                <button type="submit" style={styles.button}>Register</button>
                <p style={styles.linkText}>Already have an account? <Link to='/' style={styles.link}>Login here</Link></p>
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
    }
};

export default Register;