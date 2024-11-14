import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ setLoggedIn, setShowJoin, loggedIn, name }) {
  const handleShowJoin = () => {
    setShowJoin((prev) => !prev);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };
  return (
    <>
      <div className="navbar-container">
        <h1 className="navbar-heading">FilmQuest</h1>
        <div className="navbar-menu">
          <ul className="menu-list-items">
            <Link to="/" className="menu">
              Home
            </Link>
            <li className="menu">About</li>
            <li className="menu">Contact</li>
            <Link to="/sign-in" className="menu">
              SignIn
            </Link>
            {!loggedIn ? (
              <Link to="/join" onClick={handleShowJoin} className="menu join">
                Join
              </Link>
            ) : (
              <li onClick={handleLogOut} className="menu logged">
                {name.charAt(0).toUpperCase()}
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
