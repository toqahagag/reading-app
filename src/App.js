import React, { useState, useEffect } from "react";
import * as BooksAPI from "./api/BooksAPI";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function BooksApp() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  //get all user's books
  const getAllBooks = async () => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllBooks();
  }, []); // eslint-disable-line

  //changing book's shelf
  const handleChangedShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(() => {
      changedBook.shelf = shelf;
      let booksExceptChangedOne=books.filter((book) => book.id !== changedBook.id)
      setBooks([...booksExceptChangedOne, changedBook]);
    });
  };

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                books={books}
                handleChangedShelf={handleChangedShelf}
                loading={loading}
              />
            )}
          />
          <Route
            path="/home"
            render={() => (
              <Home
                books={books}
                handleChangedShelf={handleChangedShelf}
                loading={loading}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search books={books} handleChangedShelf={handleChangedShelf} />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default BooksApp;
