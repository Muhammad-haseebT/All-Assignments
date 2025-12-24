import React from "react";

export default function BookList({ books, categories, onEdit, onDelete }) {
  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.CategoryID === id);
    return cat ? cat.CategoryName : "Unknown";
  };

  return (
    <div className="list-container">
      <h2>Saved Books</h2>

      {books?.map((book) => (
        <div className="book-item" key={book.BookID}>
          <img src={book.BookCover} className="thumb" alt="Cover" />

          <div className="info">
            <h3>{book.BookName}</h3>
            <p>Price: {book.Price}</p>
            <p>Category: {getCategoryName(book.CategoryID)}</p>
          </div>

          <div className="actions">
            <button onClick={() => onEdit(book)}>Update</button>
            <button className="delete" onClick={() => onDelete(book.BookID)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
