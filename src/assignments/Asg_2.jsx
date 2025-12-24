// App.js
import React, { useEffect, useState } from "react";
import { db, initDB } from "../db/db";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./asg_2.css";

function Asg_2() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const loadData = async () => {
    await initDB();

    const cats = await db.BookCategory.toArray();
    const bks = await db.Books.toArray();
    setCategories(cats);
    setBooks(bks);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await db.Books.delete(id);
    loadData();
  };

  const handleSuccess = () => {
    setEditingBook(null);
    loadData();
  };

  return (
    <div className="app-container">
      <BookForm
        categories={categories}
        editingBook={editingBook}
        onSuccess={handleSuccess}
      />

      <BookList
        books={books}
        categories={categories}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Asg_2;
