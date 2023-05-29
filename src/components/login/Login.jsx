import "./login.css";
import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { login } from "../../reducers/loggingReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggingReducer.user?.email);
  const status = useSelector((state) => state.loggingReducer.user?.status);
  const [uemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef();
  useEffect(() => {
    if (status === "valid") {
      navigate("/");
    } else if (status === "invalid") {
      ref.current.hidden = false;
      // setTimeout(() => {
      //   ref.current.hidden = true;
      // }, 1000);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(uemail, password));
  };

  return (
    <div className="login">
      <span className="loginTitle">LOGIN</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Enter Your Email</label>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          className="loginInput"
          type="text"
          placeholder="Enter your email"
        />
        <label>Password</label>
        <input
          required
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password "
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <div ref={ref} className="validate" hidden>
        Incorrect Credentials
      </div>
      {/* <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button> */}
    </div>
  );
}
