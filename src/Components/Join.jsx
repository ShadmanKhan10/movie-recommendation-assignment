import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join({ setLoggedIn, name, setName }) {
  const navigate = useNavigate();

  const [password, setPassowrd] = useState("");
  //https://api.themoviedb.org/3/movie/157336?api_key=API_KEY
  //https://api.themoviedb.org/3/genre/movie/list
  const handlesubmit = (event) => {
    console.log("In the submit function");
    event.preventDefault();
    setTimeout(() => {
      setLoggedIn(true);
      navigate("/");
    }, 2000);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassowrd(event.target.value);
  };

  return (
    <>
      <div style={{ marginTop: "5rem" }}>
        <form onSubmit={handlesubmit}>
          <input
            required
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button>Join</button>
        </form>
      </div>
    </>
  );
}
