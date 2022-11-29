import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './AppProvider';
import SearchResults from './components/SearchResults';
import Site from './components/Site';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import Login from './components/Login';
import Header from './components/Header';
import NotFoundPage from './components/NotFoundPage';
import Landing from './components/Landing';
import Home from './components/Home';
import List from './components/List';
import Lists from './components/Lists';
import './App.css';

function App() {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const theUser = localStorage.getItem('user');

    if (theUser && !theUser.includes('undefined')) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={user?.email ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={user?.email ? <Navigate to="/" /> : <Login />} />
        <Route path="/search/:site" element={<Site />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/lists" element={<Lists />}></Route>
        <Route path="/lists/:list" element={<List />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
