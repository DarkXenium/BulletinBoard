import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./userPosts.css";
function UserPosts() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [postData, setData] = useState([]);
  const uid = useParams();
  const UID = uid.uid;
  var res;
  useEffect(() => {
    axios
      .get(`https://localhost:7221/post/${UID}/all`)
      .then((response) => {
        res = response.data;

        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (item) => {
    // console.log("UID:" + UID);
    axios
      .delete(`https://localhost:7221/api/Posts/${item.postId}?UID=${item.uid}`)
      .then(() => {
        navigate(`/userPosts/${item.uid}/all`);
      });
  };

  const handleUpdate = (item) => {
    console.log(item.postId);
  };

  return (
    <>
      <div className="container">
        <div className="myComments">
          <Link to={`/comments/${UID}`}>
            <Button variant="outline-primary" size="lg">
              My Comments
            </Button>
          </Link>
        </div>
        {data.map((item) => (
          <Link className="links" to={`/post/${item.postId}`} key={item.postId}>
            <div className="post-container" key={item.UID}>
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
              <div className="buttonsPosts">
                <button onClick={() => handleDelete(item)} id="delete">
                  DELETE
                </button>
                <Link to={`/update/${item.uid}/${item.postId}`}>
                  <button onClick={() => handleUpdate(item)} id="update">
                    UPDATE
                  </button>
                </Link>
              </div>
            </div>
          </Link>
        ))}
        <Link to={`/write/${UID}`}>
          <Button id="btn-add" variant="primary">
            ADD POST
          </Button>{" "}
        </Link>
      </div>
    </>
  );
}

export default UserPosts;
