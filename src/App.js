import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import Pagination from "./components/Pagination";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  //query entered by user here
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(10);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false); //for showing the modal
  const [authorDetails, setAuthorDetails] = useState({});
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    //if query is empty
    if (!query.trim()) {
      setBooks([]);
      setTotalPages(0);
      return;
    }

    const limit = 20;
    const offset = (page - 1) * limit; // Calculated the offset based on the current page

    // if (!debouncedQuery) return;
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}&limit=${limit}&offset=${offset}`
      );

      console.log(response.data);
      const booksData = response.data.docs.map((book) => ({
        key: book.key,
        title: book.title,
        author_name: book.author_name?.[0],
        cover_id: book.cover_i,
      }));

      setBooks(booksData);
      setTotalPages(Math.ceil(response.data.numFound / limit)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const closeModal = () => setShowModal(false);


  //to trigger the handleSearch 


  // const handleNext = () => {
  //   if (page < totalPages) {
  //     setPage(page + 1); // Increment page
  //   }
  // };

  // const handlePrev = () => {
  //   //to avoid -ve indexation here
  //   if (page > 1) {
  //     setPage(page - 1); // Decrement page
  //   }
  // };

  const handleNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      handleSearch(newPage); // Trigger search with new page
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      handleSearch(newPage); // Trigger search with new page
    }
  };

  


  // useEffect(() => {
  //   if (query) {
  //     handleSearch();
  //   }
  // }, [page, query]);

  const handleAuthorClick = async (authorKey) => {
    console.log("handleAuthorClick: ",authorKey);
    try {
      // Make API call for author details
      const response = await axios.get(
        `https://openlibrary.org/authors/${authorKey}.json`
      );

      // exatract the data
      const authorData = {
        name: response.data.name,
        bio: response.data.bio?.value || "No bio available", // Handle cases where bio is missing
        photo_url:
          `https://covers.openlibrary.org/b/id/${response.data.photos?.[0]}-M.jpg` ||
          "", // we will use photo ID if available
      };

      setAuthorDetails(authorData);
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };



  return (
    <div className="app">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={() => handleSearch(page)} 
      />
       {query && books.length > 0 && (
        <>
          <BookGrid books={books} handleAuthorClick={handleAuthorClick} />
          <Pagination
            page={page}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </>
      )}
      {showModal && <Modal authorDetails={authorDetails} closeModal={closeModal} />}
    </div>
  );
}

export default App;
