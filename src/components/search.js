import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../api/BooksAPI";
import { Spinner } from "react-bootstrap";
import SingleBook from "./singleBook";

function Search(props) {
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [isvalueChanged, setIsValueChanged] = useState(false);
  const [firstTypingFlag, setFirstTypingFlag] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setIsValueChanged(!isvalueChanged);
    setFirstTypingFlag(true);
  };
  useEffect(() => {
    if (firstTypingFlag) {
      getBooks();
    }
  }, [isvalueChanged]); // eslint-disable-line

  const getBooks = () => {
    if (searchValue) {
      setLoading(true);
      BooksAPI.search(searchValue.trim()).then((response) => {
        if (response.length > 0) {
          setSearchResult(response);
        } else {
          setSearchResult([]);
        }
        setLoading(false);
      });
    } else {
      setSearchResult([]);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/home">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type="text"
            placeholder="Search by title or author"
            name="search"
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <ol className="books-grid">
            {loading ? (
              <Spinner
                className="mr-1 app-page-spinner"
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
              />
            ) : (firstTypingFlag === true &&
                searchResult &&
                searchResult.length) > 0 ? (
              searchResult.map((book, index) => (
                <li key={index}>
                  <SingleBook
                    book={book}
                    handleChangedShelf={props.handleChangedShelf}
                    isSearch={true}
                    books={props.books}
                  />
                </li>
              ))
            ) : (
              firstTypingFlag && searchValue!=="" ?(<span>No Data</span>) :(<span>Search Results</span>)
            )}
          </ol>
        </ol>
      </div>
    </div>
  );
}
export default Search;
