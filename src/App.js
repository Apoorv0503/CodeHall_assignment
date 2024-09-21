import SearchBar from './components/SearchBar';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {

  //query entered by user here
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(10);
  const [books, setBooks] = useState([]);

  const handleSearch=()=>{
    // 
  }
  return (
    <div className="app">
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
    </div>
  );
}

export default App;
