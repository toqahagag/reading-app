import React,{useEffect,useState} from "react";
import bookPlaceHolder from "../assets/placeholder_book.png"
import PropTypes from "prop-types";

function SingleBook(props) {
  const [selectedShelf, setSelectedShelf] = useState();
  
  //change book shelf handler
  const handleChange=(e)=>{
    const changedState=e.target.value;
    props.handleChangedShelf(props.book, changedState);
  }
  //handle case of book without image
  const coverImg =
  props.book.imageLinks && props.book.imageLinks.thumbnail
    ? props.book.imageLinks.thumbnail
    : bookPlaceHolder;

    useEffect(() => {
      if(props.isSearch){
         for (let singleBook of props.books) {
        if (singleBook.id === props.book.id) {
          setSelectedShelf(singleBook.shelf);
          break;
        }
      }}
      else{
        setSelectedShelf(props.book.shelf);
      }
    }, []); // eslint-disable-line
  

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 174,
            backgroundImage: `url(${coverImg})`,
          }}
        />
        <div className="book-shelf-changer">
          <select className="checkmark" onChange={handleChange} value={selectedShelf?selectedShelf:props.book.shelf?props.book.shelf:"none"} defaultValue={selectedShelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">{selectedShelf==="currentlyReading"?"✓":""}Currently Reading</option>
            <option value="wantToRead">{selectedShelf==="wantToRead"?'✓':""}Want to Read</option>
            <option value="read">{selectedShelf==="read"?'✓':""}Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title? props.book.title : 'Missing Book Title'}</div>
      <div className="book-authors">{  props.book.authors &&  props.book.authors.length>0 &&props.book.authors.map((auth,index)=>(<div key={index}>{auth}</div>))}</div>
    </div>
  );
}

SingleBook.propTypes = {
  book:PropTypes.object.isRequired,
  handleChangedShelf:PropTypes.func.isRequired,
  isSearch:PropTypes.bool,
  books:PropTypes.array
};
export default SingleBook;
