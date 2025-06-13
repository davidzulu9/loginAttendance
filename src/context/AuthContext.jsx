import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Users stored in memory
  const [users, setUsers] = useState([]); // Stores { email, password }
  const [currentUser, setCurrentUser] = useState(null); // Stores the logged-in user's email

  // New state for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // When a user logs in, ensure their attendance records are initialized
  useEffect(() => {
    if (currentUser && !attendanceRecords[currentUser]) {
      setAttendanceRecords((prevRecords) => ({
        ...prevRecords,
        [currentUser]: [], // Initialize an empty array for new user
      }));
    }
  }, [currentUser, attendanceRecords]);

  // Local Registration Function
  const register = (email, password) => {
    if (users.find((user) => user.email === email)) {
      throw new Error("User with this email already exists.");
    }
    const newUser = { email, password };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log(`Registered new user: ${email}`);
    return true;
  };

  // Local Login Function
  const login = (email, password) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser.email);
      console.log(`User logged in: ${foundUser.email}`);
      return true;
    }
    throw new Error("Invalid email or password.");
  };

  // Local Logout Function
  const logout = () => {
    // Checking if there's an active attendance session before logging out
    if (currentUser) {
      const userRecords = attendanceRecords[currentUser] || [];
      const lastRecord = userRecords[userRecords.length - 1];
      if (lastRecord && !lastRecord.logoutTime) {
        // Automatically "log out" if there's an open session
        console.warn(
          `User ${currentUser} had an open attendance session. Automatically logging out attendance.`
        );
        setAttendanceRecords((prevRecords) => ({
          ...prevRecords,
          [currentUser]: prevRecords[currentUser].map((rec, index) =>
            index === prevRecords[currentUser].length - 1
              ? { ...rec, logoutTime: new Date() }
              : rec
          ),
        }));
      }
    }
    setCurrentUser(null);
    console.log("User logged out.");
  };

  // Log attendance function
  const logInAttendance = () => {
    if (!currentUser) {
      throw new Error("No user is logged in.");
    }

    const userRecords = attendanceRecords[currentUser] || [];
    const lastRecord = userRecords[userRecords.length - 1];

    // Check for an active attendance session
    if (lastRecord && !lastRecord.logoutTime) {
      throw new Error("You are already logged in."); //Throws an error when trying to log in while still logged in
    }

    //Creatiing a new record
    const newRecord = {
      loginTime: new Date(),
      logoutTime: null,
    };

    setAttendanceRecords((prevRecords) => ({
      ...prevRecords,
      [currentUser]: [...(prevRecords[currentUser] || []), newRecord],
    }));
    console.log(
      `${currentUser} logged in attendance at ${newRecord.loginTime}`
    );
    return newRecord; // Return the new record for immediate display
  };

  //log out attendance function
  const logOutAttendance = () => {
    if (!currentUser) {
      throw new Error("No user is logged in.");
    }

    const userRecords = attendanceRecords[currentUser] || []; //Getting the user attendance records and store the into the user's records
    const lastRecordIndex = userRecords.length - 1;

    if (lastRecordIndex < 0 || userRecords[lastRecordIndex].logoutTime) {
      throw new Error("No active login session to log out from."); //Throws an error if there is no active log out session
    }

    const updatedRecords = userRecords.map(
      (record, index) =>
        index === lastRecordIndex
          ? { ...record, logoutTime: new Date() }
          : record //Update the user record
    );

    setAttendanceRecords((prevRecords) => ({
      ...prevRecords,
      [currentUser]: updatedRecords,
    }));
    console.log(
      `${currentUser} logged out attendance at ${updatedRecords[lastRecordIndex].logoutTime}`
    );
    return updatedRecords[lastRecordIndex]; // Return the updated record
  };

  // Helper to get current attendance status
  const getCurrentAttendanceStatus = () => {
    if (!currentUser) return null;
    const userRecords = attendanceRecords[currentUser] || [];
    const lastRecord = userRecords[userRecords.length - 1];
    return lastRecord && !lastRecord.logoutTime ? lastRecord : null;
  };

  // Helper to get all attendance records for the current user
  const getUserAttendanceRecords = () => {
    if (!currentUser) return [];
    return attendanceRecords[currentUser] || [];
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
    logInAttendance,
    logOutAttendance,
    getCurrentAttendanceStatus,
    getUserAttendanceRecords,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
