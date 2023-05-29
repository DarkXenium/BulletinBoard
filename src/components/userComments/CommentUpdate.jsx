import "./userComment.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function CommentUpdate() {
  const [commdata, setCommdata] = useState("");
  const { commid, postid, uid } = useParams();
  const navigate = useNavigate();

  const updateComment = {
    commid: commid,
    postid: postid,
    uid: uid,
    commdata: commdata,
    commtime: "string",
  };
  // console.log(postData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("https://localhost:7221/api/Comments", [updateComment])
      .then((res) => {
        navigate(`/comments/${uid}`);
      });
  };
  return (
    <div className="updateCOntainer">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Write the change in comment here : </Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "150px" }}
            onChange={(e) => {
              setCommdata(e.target.value);
            }}
          />
        </Form.Group>

        <Button type="submit" variant="warning  ">
          Update Comment
        </Button>
      </Form>
    </div>
  );
}
