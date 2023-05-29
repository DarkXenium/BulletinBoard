import "./write.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Write() {
  const [authorName, setAuthorName] = useState("");
  const [posttopic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [postDetails, setContents] = useState("");
  const [photourl, setPhotourl] = useState("");
  const { uid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    //api to get individual user data
    axios.get(`https://localhost:7221/user?email=${uid}`).then((res) => {
      setAuthorName(res.data[0].uname);
    });
  }, []);
  const postData = {
    postId: 0,
    uid: uid,
    authorName: authorName,
    posttopic: posttopic,
    category: category,
    postDetails: postDetails,
    postTime: "string",
    likes: 0,
    views: 0,
    photourl: photourl,
  };
  // console.log(postData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://localhost:7221/posts", [postData]).then((res) => {
      navigate(`/userPosts/${uid}/all`);
    });
  };
  return (
    <div className="updateCOntainer">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Enter the Image URL :
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                setPhotourl(e.target.value);
              }}
            />
          </InputGroup>

          <Form.Label>Topic</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter the Topic"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Post</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write your post here"
            style={{ height: "100px" }}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          POST
        </Button>
      </Form>
    </div>
  );
}
