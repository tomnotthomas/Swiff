import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <AppContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}