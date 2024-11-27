import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserData = (data) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <AuthContext.Provider value={{ userData, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
