import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
  user: null,
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AppContext);
}
