import React, { useEffect, useState } from "react";
import axios from "axios";
import "./comments.css";

function Comments({ postId }) {
  const [commdata, setCommdata] = useState([]);
  useEffect(() => {
    axios
      .get(`https://localhost:7221/comments?postid=${postId}`)
      .then((res) => {
        setCommdata(res.data);
      });
  }, []);

  return (
    <>
      <p className="postCHead">POST COMMENTS</p>
      {commdata.map((item) => (
        <div className="comm-container" key={item.postId}>
          <div className="post-item">
            <p>User:</p> {item.uid}
          </div>
          <div className="post-item">{item.commdata}</div>
          <div className="post-item">
            <p>Comment Time:</p> {item.commtime}
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;
