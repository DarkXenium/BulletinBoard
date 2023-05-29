import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import Topbar from "./components/topbar/Topbar";
import Write from "./components/write/Write";
import WriteComment from "./components/writeComment/WriteComment";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import UserPosts from "./components/userPosts/UserPosts";
import Update from "./components/update/Update";
import "bootstrap/dist/css/bootstrap.min.css";
import UserComments from "./components/userComments/UserComments";
import CommentUpdate from "./components/userComments/CommentUpdate";

function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <Posts />
            </>
          }
        />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userPosts/:uid/all" element={<UserPosts />} />
        <Route path="/update/:uid/:postId" element={<Update />} />
        <Route path="/write/:uid" element={<Write />} />
        <Route path="/writeComment/:id" element={<WriteComment />} />
        <Route path="/comments/:uid" element={<UserComments />} />
        <Route
          path="/updateComment/:uid/:commid/:postid"
          element={<CommentUpdate />}
        />
      </Routes>
    </div>
  );
}
<script
  src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
  crossorigin
></script>;

export default App;
