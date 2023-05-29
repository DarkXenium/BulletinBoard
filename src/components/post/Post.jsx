import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./post.css";
import Comments from "../comments/Comments";
import { useSelector } from "react-redux";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [like, setLike] = useState();
  const [likeStatus, setLikeStatus] = useState();
  const uemail = useSelector((state) => state.loggingReducer.user?.email);

  const ref = useRef();
  useEffect(() => {
    axios
      .get(`https://localhost:7221/post/${postId}`)
      .then((response) => {
        setPost(response.data);
        setLike(response.data.likes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post(`https://localhost:7221/view/${postId}`)
      .then((response) => {
        // setViews(response.data.views);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://localhost:7221/likestatus?postId=${postId}&uid=${uemail}`)
      .then((res) => {
        if (res.data === 1) {
          // console.log(ref.current)
          setLikeStatus(true);
        } else {
          setLikeStatus(false);
        }
      });
  }, []);

  const handlelike = async () => {
    axios
      .post(`https://localhost:7221/didLike?uid=${uemail}&postid=${postId}`)
      .then((res) => {
        if (res.data === 1) {
          ref.current.style.color = "rgb(0, 157, 255)";
          setLikeStatus(true);
          axios.post(`https://localhost:7221/like/${postId}`).then((res) => {
            setLike(res.data);
          });
        } else {
          ref.current.style.color = "gray";
          setLikeStatus(false);
          axios.post(`https://localhost:7221/dislike/${postId}`).then((res) => {
            setLike(res.data);
          });
        }
      });
  };
  if (ref.current) {
    if (likeStatus === true) {
      ref.current.style.color = "rgb(0, 157, 255)";
    } else {
      ref.current.style.color = "gray";
    }
  }
  if (!post) {
    return <div>Loading...</div>;
  }
  // if (liked) {
  //   ref.current.classList.remove("post-like");
  //   // ref.current.classList.add("like-disabled");
  // }
  return (
    <div className="post-details">
      <div className="imgMain">
        <img className="imagePost" src={post.photourl} alt="Post Image" />
      </div>

      <div className="post-head">{post.posttopic}</div>
      <div className="postBar">
        <div className="post-item">
          <p>Views:</p> {post.views}
        </div>
        <div className="post-item">
          <p>Author Name:</p> {post.authorName}
        </div>
        <div className="post-item">
          <p>Post Category:</p> {post.category}
        </div>
        <div className="post-item">
          <p>Post Time:</p> {post.postTime}
        </div>

        <div className="post-item">
          <p>Likes:</p> {like}
        </div>
        {/* <div className={liked ? "like-disabled" : "post-like"}> */}
        {/* {likeStatus ? ( */}
        <div ref={ref} className="post-like">
          {uemail ? <AiFillLike onClick={handlelike} /> : null}
          {/* id="likePost" */}
          {/* disabled={liked} */}
        </div>
        {/* ) : null} */}

        <div className="post-item">
          <p>Username:</p> {post.uid}
        </div>
      </div>

      <div className="post-item postDetails">
        <p>Post Content:</p> {post.postDetails}
      </div>
      {uemail ? (
        <div className="addPost">
          <Link to={`/writeComment/${post.postId}`}>
            <Button variant="info">Add Comment</Button>{" "}
          </Link>
        </div>
      ) : null}
      <div className="commentsContainer">
        <Comments postId={postId} />
      </div>
    </div>
  );
}
