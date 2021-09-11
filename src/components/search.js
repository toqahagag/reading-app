import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../api/BooksAPI";
import { Spinner } from "react-bootstrap";
import SingleBook from "./singleBook";
import PropTypes from "prop-types";
import { useDebounce } from "../helpers/debounce"
function Search(props) {
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(); //show loading while api gets data
  const [isvalueChanged, setIsValueChanged] = useState(false); //flag to change state after change search value
  const [firstTypingFlag, setFirstTypingFlag] = useState(false); //flag to change text in serach container
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  //change search value function
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setIsValueChanged(!isvalueChanged);
    setFirstTypingFlag(true);
  };

  useEffect(
    () => {
      if (debouncedSearchTerm && firstTypingFlag) {
      getBooks();
      } else {
        setSearchResult();
        setLoading(false);
      }
    },
    [debouncedSearchTerm] // eslint-disable-line
  );
  //get books according to entered search value
  const getBooks = () => {
    if (debouncedSearchTerm) {
      setLoading(true);
      BooksAPI.search(debouncedSearchTerm.trim()).then((response) => {
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
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            name="search"
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
       </div>
      <div className="search-books-results">
        {firstTypingFlag === true &&
          searchResult &&
          searchResult.length > 0 && (
            <h3>No. of Books Founded {searchResult.length}</h3>
          )}
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
          ) : firstTypingFlag && searchValue !== "" ? (
            <span>No Data</span>
          ) : (
            <span>Search Results</span>
          )}
        </ol>
      </div>
    </div>
  );
}

Search.propTypes = {
  books: PropTypes.array,
  handleChangedShelf: PropTypes.func.isRequired,
};
export default Search;
