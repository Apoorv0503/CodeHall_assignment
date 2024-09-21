import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import Pagination from './components/Pagination';
import './App.css';
import axios from 'axios';



function App() {

  //query entered by user here
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(10);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);  //for showing the modal
  const [authorDetails, setAuthorDetails] = useState({});
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
  //if query is empty
  if (!query.trim()) return; 

  try {
    // made API call to OpenLibrary's search 
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${totalPages}`);
    // 
    
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


const closeModal = () => setShowModal(false);

const handleNext = () => setPage(page + 1);
const handlePrev = () => setPage(page - 1);




const handleAuthorClick = async (authorKey) => {
  try {
    // Make API call for author details 
    const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
    
    // exatract the data
    const authorData = {
      name: response.data.name,
      bio: response.data.bio?.value || 'No bio available', // Handle cases where bio is missing
      photo_url: `https://covers.openlibrary.org/b/id/${response.data.photos?.[0]}-M.jpg` || '', // Use photo ID if available
    };

    setAuthorDetails(authorData);
    setShowModal(true); // Show the modal

  } catch (error) {
    console.error("Error fetching author details:", error);
};
}


  return (
    <div className="app">
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        <BookGrid books={books} handleAuthorClick={handleAuthorClick} />
        <Pagination page={page} totalPages={totalPages} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
  
}

export default App;
