import React, { useEffect, useState } from "react";
import { db } from "../../db/db";

export default function BookForm({ categories, editingBook, onSuccess }) {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [bookCover, setBookCover] = useState("");

  useEffect(() => {
    if (editingBook) {
      setBookName(editingBook.BookName);
      setPrice(editingBook.Price);
      setCategoryID(editingBook.CategoryID);
      setBookCover(editingBook.BookCover);
    }
  }, [editingBook]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBookCover(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      BookName: bookName,
      Price: Number(price),
      CategoryID: Number(categoryID),
      BookCover: bookCover
    };

    if (editingBook) {
      await db.Books.update(editingBook.BookID, payload);
    } else {
      await db.Books.add(payload);
    }

    onSuccess();
    setBookName("");
    setPrice("");
    setCategoryID("");
    setBookCover("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Update Book" : "Add New Book"}</h2>

      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <select
        value={categoryID}
        onChange={(e) => setCategoryID(e.target.value)}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.CategoryID} value={cat.CategoryID}>
            {cat.CategoryName}
          </option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleImage} />

      {bookCover && <img src={bookCover} className="preview" alt="Cover" />}

      <button type="submit">
        {editingBook ? "Save Changes" : "Add Book"}
      </button>
    </form>
  );
}
