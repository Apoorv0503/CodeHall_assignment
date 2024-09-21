import React from 'react';

const BookGrid = ({ books }) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.key} className="book-card">
          <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt="Book Cover" className="book-cover" />
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author_name?.[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
