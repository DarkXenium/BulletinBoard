import { useDispatch, useSelector } from "react-redux";
import "./topbar.css";
import {
  BrowserRouter,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { logoutaction } from "../../actions/loggingAction";

export default function Topbar() {
  const user = useSelector((state) => state.loggingReducer.user?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutaction("error"));
  };

  return (
    <div className="top">
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="homeli" to={"/"}>
            <li className="topListItem ">HOME</li>
          </Link>
          {user ? (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          ) : null}
        </ul>
      </div>
      <div className="topRight">
        <ul className="topList">
          {!user ? (
            <Link className="homeli" to={"/login"}>
              <li className="topListItem">LOGIN</li>
            </Link>
          ) : null}

          {!user ? (
            <Link className="homeli" to={"/register"}>
              <li className="topListItem">REGISTER</li>
            </Link>
          ) : null}

          {user ? (
            <Link className="homeli" to={`/userPosts/${user}/all`}>
              <li className="topListItem">MY PROFILE</li>
            </Link>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
