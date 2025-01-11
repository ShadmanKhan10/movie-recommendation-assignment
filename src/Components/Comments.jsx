import React from "react";

export default function Comments() {
  return (
    <div className="all-comments-container">
      <div className="comments-container">
        <label className="username">Shadman Khan:</label>{" "}
        <label className="comment">Wonderful Movie, Enjoyed It</label>
      </div>
      <div className="comments-container">
        <label className="username">Hamdan Khan:</label>{" "}
        <label className="comment">
          jhgHGAJHGJHAG AGJGAJHG JHSGJKGSJHG ANBJHGAJ KJAHKJHAKJH KJAHKJHA
          KJHAKJHAK JHAKJHKJ GJHSGJWonderful Movie, Enjoyed It
        </label>
      </div>
      <div className="comments-container">
        <label className="username">MD Sami Adnan:</label>{" "}
        <label className="comment">Wonderful Movie, Enjoyed It</label>
      </div>
    </div>
  );
}
