import React, { Fragment } from "react";
import SingleBook from "./singleBook";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Home(props) {
  return (
    <Fragment>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.loading ? (
                    <Spinner
                      className="mr-1 app-page-spinner"
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (props.books && props.books.length) > 0 ? (
                    props.books
                      .filter((book) => book.shelf.includes("currentlyReading"))
                      .map((book, index) => (
                        <li key={index}>
                          <SingleBook
                            book={book}
                            handleChangedShelf={props.handleChangedShelf}
                          />
                        </li>
                      ))
                  ) : (
                    <span>No Data</span>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.loading ? (
                    <Spinner
                      className="mr-1 app-page-spinner"
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (props.books && props.books.length) > 0 ? (
                    props.books
                      .filter((book) => book.shelf.includes("wantToRead"))
                      .map((book, index) => (
                        <li key={index}>
                          <SingleBook
                            book={book}
                            handleChangedShelf={props.handleChangedShelf}
                          />
                        </li>
                      ))
                  ) : (
                    <span>No Data</span>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.loading ? (
                    <Spinner
                      className="mr-1 app-page-spinner"
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (props.books && props.books.length) > 0 ? (
                    props.books
                      .filter((book) => book.shelf.includes("read"))
                      .map((book, index) => (
                        <li key={index}>
                          <SingleBook
                            book={book}
                            handleChangedShelf={props.handleChangedShelf}
                          />
                        </li>
                      ))
                  ) : (
                    <span>No Data</span>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  books: PropTypes.array,
  handleChangedShelf: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
