import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./userComment.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";

function Comments() {
  const { uid } = useParams();
  const [commdata, setCommdata] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0); // new state variable

  useEffect(() => {
    axios.get(`https://localhost:7221/userComment?uid=${uid}`).then((res) => {
      setCommdata(res.data);
    });
  }, [deleteCounter]);

  const handledelete = (commid) => {
    const deleteData = {
      commid,
      uid,
    };
    axios
      .delete("https://localhost:7221/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        data: [deleteData],
      })
      .then((res) => {
        setDeleteCounter((prev) => prev + 1); // update deleteCounter
      });
  };

  return (
    <>
      <p className="postCHead">POST COMMENTS</p>
      {commdata.map((item) => (
        <div className="user-comm-container" key={item.postId}>
          <div className="post-item">{item.commdata}</div>
          <div className="post-item">
            <p>Comment Time:</p> {item.commtime}
          </div>
          <div className="iconCont">
            <AiFillDelete
              onClick={() => handledelete(item.commid)}
              id="deleteBtn"
            />
            <Link to={`/updateComment/${uid}/${item.commid}/${item.postid}`}>
              <FaEdit id="editBtn" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;
