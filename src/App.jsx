import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Join from "./Components/Join.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import SignIn from "./Components/SignIn.jsx";

function App() {
  const [name, setName] = useState("");
  const [showJoin, setShowJoin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setShowJoin={setShowJoin}
        name={name}
      />
      {/* {loggedIn && (
        <p className="welcome-text">
          Hi {name}, We were waiting for you, We've got your binge right here{" "}
        </p>
      )} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/join"
          element={
            <Join setLoggedIn={setLoggedIn} name={name} setName={setName} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
