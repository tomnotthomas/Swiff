import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  // const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}