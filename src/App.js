import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './style.scss'
import Pagination from "./pages/pagination";

function App() {
  const [userKey, setUserKey] = useState('YWHSJHqUXlXDWcF55qBptGQsg3njRLBeSkcL1YB6gyU');
  const [photo, setPhoto] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  function handleSubmit() {
    console.log(photo);
    const url = "https://api.unsplash.com/search/collections?page=1&query=" + photo + "&client_id=" + userKey;

    axios.get(url)
      .then(response => {
        console.log(response);
        setImages(response.data.results)
      })
  }
  function handleChange(event) {
    setPhoto(event.target.value)
  }
  const indexLastPage = currentPage * postsPerPage;
  const indexFirstPage = indexLastPage - postsPerPage;
  const currentPosts = images.slice(indexFirstPage, indexLastPage)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (
    <div className="App">
      <div className="forTitle">
        <h2>Search for what picture you want to see</h2>     
         </div>
      <div className="forSearch">
        <input placeholder="search..." onChange={handleChange} className="form-control"></input>
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">GO</button>
      </div>

      <div className="forImages">

        {currentPosts?.map(e => {
          return (
            <div key={e.id} >
              <img src={e.cover_photo.urls.small}></img>
            </div>
          )
        })}
      </div>
      {photo ?
        <Pagination postsPerPage={postsPerPage} totalPosts={images.length} paginate={paginate} currentPage={currentPage} currentPosts={currentPosts} />
        : <></>
      }

    </div>
  );
}

export default App;
