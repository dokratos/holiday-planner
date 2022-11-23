import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [siteData, setSiteData] = useState({});

  return (
    <AppContext.Provider value={{
      searchValue,
      setSearchValue,
      siteData,
      setSiteData,
    }}>
      {children}
    </AppContext.Provider>
  )
};

export { AppContext, AppProvider };
