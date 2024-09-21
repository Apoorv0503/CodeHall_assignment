import React from 'react';

const BookGrid = ({ books }) => {
    
  // dummy image URL
  const fallbackImage = 'https://via.placeholder.com/150?text=No+Cover';

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.key} className="book-card">
          <img
            src={book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : fallbackImage}
            alt="Book Cover"
            className="book-cover"
          />
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author_name?.[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
