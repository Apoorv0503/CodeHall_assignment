import SearchBar from './components/SearchBar';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {

  //query entered by user here
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(10);
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
  //if query is empty
  if (!query.trim()) return; 

  try {
    // made API call to OpenLibrary's search 
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    // &page=${totalPages}
    
    console.log(response.data);
    // extract the books data
    const booksData = response.data.docs.map(book => ({
      key: book.key,
      title: book.title,
      author_name: book.author_name?.[0], // Handle cases where author name is not available
      cover_id: book.cover_i, // Use cover_i for the cover image
    }));

    setBooks(booksData);
    setTotalPages(Math.ceil(response.data.numFound / 20)); // calculate total pages (20 results per page)

  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

  return (
    <div className="app">
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
    </div>
  );
}

export default App;
