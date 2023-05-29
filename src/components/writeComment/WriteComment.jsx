import "./writeComment.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Write() {
  const [commdata, setCommdata] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const uemail = useSelector((state) => state.loggingReducer.user?.email);

  const postComment = {
    commid: 0,
    postid: id,
    uid: uemail,
    commdata: commdata,
    commtime: "string",
  };
  // console.log(postData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7221/postComments", [postComment])
      .then((res) => {
        navigate(`/post/${id}`);
      });
  };
  return (
    <div className="updateCOntainer">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Write your Comment here : </Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "150px" }}
            onChange={(e) => {
              setCommdata(e.target.value);
            }}
          />
        </Form.Group>

        <Button type="submit" variant="warning  ">
          Post Comment
        </Button>
      </Form>
    </div>
  );
}
