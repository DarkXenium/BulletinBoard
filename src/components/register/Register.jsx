import axios from "axios";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, redirect } from "react-router-dom";
export default function Register() {
  const [uid, setUsername] = useState("");
  const [uemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setName] = useState("");
  const [phoneno, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      uid,
      uemail,
      uname,
      phoneno,
      password,
    };
    axios.post("https://localhost:7221/register", userData).then((response) => {
      // console.log(response.status, response.data);
      // console.log(userData);
      if (response.status == 200) {
        navigate("/login");
      }
    });
  };

  return (
    <div id="register" className="register">
      <span className="registerTitle">REGISTER</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="registerInput"
          type="text"
          required
          placeholder="Enter your Name"
        />
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="registerInput"
          type="text"
          required
          placeholder="Enter your username"
        />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="registerInput"
          type="email"
          required
          placeholder="Enter your email"
        />
        <label>Phone No</label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          className="registerInput"
          type="tel"
          pattern="[0-9]{10}"
          required
          maxLength={10}
          placeholder="Enter your Phonenumber"
        />

        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="registerInput"
          type="password"
          required
          placeholder="Enter your password"
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
