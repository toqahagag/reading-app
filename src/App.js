import React ,{useState,useEffect}from "react";
import * as BooksAPI from "./api/BooksAPI";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function BooksApp()  {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const getAllBooks = async () => {
    BooksAPI.getAll().then(books => {setBooks(books);
    setLoading(false);});
    
    console.log(books);
  };
  useEffect(() => {
    getAllBooks();
  }, []);// eslint-disable-line

 const   handleChangedShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      let prevBooks=[...books];
      setBooks(prevBooks.filter(book => book.id !== changedBook.id)
          .concat(changedBook))
      });
  };
  
    return (
      <BrowserRouter>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/"  render={() => (
              <Home books={books} handleChangedShelf={handleChangedShelf} loading={loading} />
            )} />
            <Route path="/home"  render={() => (
              <Home books={books} handleChangedShelf={handleChangedShelf} loading={loading} />
            )} />
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
