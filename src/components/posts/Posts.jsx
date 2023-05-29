import "./posts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, Route } from "react-router-dom";

export default function Posts() {
  const [data, setData] = useState([]);
  const [dataCat, setDataCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  var res;
  var x;
  useEffect(() => {
    axios
      .get("https://localhost:7221/api/Posts")
      .then((response) => {
        res = response.data;

        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://localhost:7221/category")
      .then((response) => {
        x = response.data;
        setDataCat(x);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const clearFilter = () => {
    setSelectedCategory("");
  };
  const filteredData = data.filter((item) => {
    return selectedCategory === "" || item.category === selectedCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="containerHome">
        {currentPosts.map((item) => (
          <Link className="links" to={`/post/${item.postId}`} key={item.postId}>
            <div className="post-container" key={item.postId}>
              <div className="post-item">
                <p>Author Name:</p> {item.authorName}
              </div>
              <div className="post-item">
                <p>Post Topic: </p>
                {item.posttopic}
              </div>
              <div className="post-item">
                <p>Post Category:</p> {item.category}
              </div>
              {/* <div className="iconsholder">
              <AiFillDelete
                onClick={() => handledelete(item.commid)}
                id="deleteBtn"
              />
              <Link to={`/updateComment/${uid}/${item.commid}/${item.postid}`}>
                <FaEdit id="editBtn" />
              </Link>
            </div> */}
            </div>
          </Link>
        ))}
      </div>

      {/* //------ SIDEBAR - CATEGORIES ------- */}
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <h5 id="removefilter" onClick={clearFilter}>
            Remove filter
          </h5>
          <ul className="sidebarList">
            {dataCat.map((item) => (
              <a>
                <li
                  id="catItem"
                  key={item.postId}
                  onClick={() => handleCategoryClick(item.category)}
                >
                  {item.category}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={currentPosts.length < postsPerPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
