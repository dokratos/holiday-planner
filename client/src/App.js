import { Routes, Route } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import Site from './components/Site';
import Favorites from './components/Favorites';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<SearchResults />}></Route>
        <Route path="/search/:site" element={<Site />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes> 
    </div>
  );
}

export default App;
