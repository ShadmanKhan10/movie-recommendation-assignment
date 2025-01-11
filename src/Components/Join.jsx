import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.svg";

export default function Join({ setLoggedIn, name, setName }) {
  const navigate = useNavigate();
  const [password, setPassowrd] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToSignIn = () => {
    navigate("/sign-in");
  };

  const validateInputs = () => {
    let isValid = true;

    if (name === "") {
      setNameError(true);
      isValid = false;
    }

    if (password === "" || password.length < 5) {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleClear = () => {
    setName("");
    setPassowrd("");
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (validateInputs()) {
      setTimeout(() => {
        setLoading(false);
        setLoggedIn(true);
        handleClear();
        navigate("/");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
        // navigate("/");
      }, 1000);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassowrd(event.target.value);
    password.length > 5 && setPasswordError(false);
  };

  return (
    <>
      <div className="signup-container">
        <p className="sign-up">Sign Up</p>
        <p className="signup-tagline">Let's begin the quest</p>
        <form
          className="form-container"
          onSubmit={name && password && handlesubmit}
        >
          <input
            className="input-join"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          {nameError && (
            <label className="error-msg">Enter your username</label>
          )}
          <input
            className="input-join"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <label className="error-msg">
              Password should be grater than 5
            </label>
          )}
          <button className="join-btn">
            {loading ? (
              <img src={loader} alt="loading" className="loader" />
            ) : (
              "Join"
            )}
          </button>
          {/* <label className="sign-in">SignIn</label> */}
        </form>
      </div>
    </>
  );
}
