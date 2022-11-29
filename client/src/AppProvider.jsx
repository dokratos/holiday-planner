import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [siteData, setSiteData] = useState({});
  const [lists, setLists] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue,
        siteData,
        setSiteData,
        user,
        setUser,
        lists,
        setLists,
        favorites,
        setFavorites
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
