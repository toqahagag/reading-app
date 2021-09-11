import React,{useEffect,useState} from "react";
import bookPlaceHolder from "../assets/placeholder_book.png"
function SingleBook(props) {
  const [selectedShelf, setSelectedShelf] = useState();
  
  const handleChange=(e)=>{
    const changedState=e.target.value;
    props.handleChangedShelf(props.book, changedState);
  }
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
          <select className="checkmark" onChange={handleChange} value={selectedShelf?selectedShelf:props.book.shelf} defaultValue={selectedShelf}>
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
export default SingleBook;
