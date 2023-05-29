import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">
          A place to write posts about anything.
        </span>
        <span className="headerTitleLg">
          BULLETIN<b>BOARD</b>
        </span>
      </div>
      <img
        className="headerImg"
        src="images/wallpaper.jpg"
        alt="A laptop workspace"
      />
    </div>
  );
}
