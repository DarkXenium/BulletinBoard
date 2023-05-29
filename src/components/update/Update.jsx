import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useNavigate, useParams, Link } from "react-router-dom";
import "./update.css";
function Update() {
  const [posttopic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [postDetails, setContents] = useState("");
  const [photourl, setPhotourl] = useState("");
  //   const handlePhotoChange = (event) => {
  //     setPhoto(event.target.files[0]); // capture the file object

  //   };

  const navigate = useNavigate();
  const { uid, postId } = useParams();
  const updateData = {
    postId: postId,
    uid: uid,
    authorName: "string",
    posttopic: posttopic,
    category: category,
    postDetails: postDetails,
    postTime: "string",
    likes: 0,
    photourl: photourl,
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("https://localhost:7221/multiple", [updateData])
      .then((response) => {
        navigate(`/userPosts/${uid}/all`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="updateCOntainer">
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Enter the Updated Image URL :
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                setPhotourl(e.target.value);
              }}
            />
          </InputGroup>

          <Form.Label>Update Topic</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter the Topic"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Update Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Update Post</Form.Label>
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
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;
