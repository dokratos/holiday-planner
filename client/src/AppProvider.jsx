import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppContext.Provider value={{
      searchValue,
      setSearchValue,
    }}>
      {children}
    </AppContext.Provider>
  )
};

export { AppContext, AppProvider };
