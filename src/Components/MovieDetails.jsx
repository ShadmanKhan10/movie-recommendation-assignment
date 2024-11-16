import React, { useState } from "react";
import like from "../assets/like.png";
import liked from "../assets/liked_clicked.png";
import comment from "../assets/comment.png";
import share from "../assets/share.png";
import closeImg from "../assets/close.png";

export default function MovieDetails({
  showMovieDetailsPopUp,
  setShowMovieDetailsPopUp,
  poster,
  backdropImg,
  movieDescription,
  movieName,
  releaseDate,
}) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handlePopUpDisplay = () => {
    setShowMovieDetailsPopUp((prev) => !prev);
  };

  const processLike = () => {
    setLikeClicked((prev) => !prev);
  };
  const enableCommentInput = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <>
      {showMovieDetailsPopUp && (
        <div className="movie-details-pop-up-container">
          <div className="movie-details-pop-up">
            <div className="close-btn-container" onClick={handlePopUpDisplay}>
              <img src={closeImg} alt="close" className="close-icon" />
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${backdropImg}`}
              alt="backdrop"
              className="popUp_backdrop"
            />
            <img
              src={`https://image.tmdb.org/t/p/original${poster}`}
              alt="backdrop"
              className="popUp_poster"
            />
            <label className="perticular-movie-title">
              {movieName} [{releaseDate}]
            </label>

            <div className="social-icons-container">
              <img
                src={!likeClicked ? like : liked}
                onClick={processLike}
                alt="like"
                className="social-icon"
              />
              <img
                src={comment}
                onClick={enableCommentInput}
                alt="comment"
                className="social-icon"
              />
              <img src={share} alt="share" className="social-icon" />
            </div>
            <div className="perticular-movie-description">
              <label>{movieDescription}</label>
            </div>
            <div className="all-comments-container">
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">
                  jhgHGAJHGJHAG AGJGAJHG JHSGJKGSJHG ANBJHGAJ KJAHKJHAKJH
                  KJAHKJHA KJHAKJHAK JHAKJHKJ GJHSGJWonderful Movie, Enjoyed It
                </label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
              <div className="comments-container">
                <label className="username">Shadman Khan:</label>{" "}
                <label className="comment">Wonderful Movie, Enjoyed It</label>
              </div>
            </div>
            {showComment && (
              <div className="comment-input-container">
                <div className="comment-icon-container">
                  <img src={share} alt="search" className="comment-icon" />
                </div>
                <input
                  placeholder="Comment"
                  className="comment-input"
                  type="text"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
