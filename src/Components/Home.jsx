import React, { useEffect, useState } from "react";
import { buttonList } from "../Data/Data.js";
import axios from "axios";
import next from "../assets/next.png";
import search from "../assets/search.png";
import like from "../assets/like.png";
import liked from "../assets/liked_clicked.png";
import comment from "../assets/comment.png";
import share from "../assets/share.png";
import closeImg from "../assets/close.png";

export default function Home() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchedMovieDetails, setSearchedMovieDetails] = useState([]);
  const [showMovieDetailsPopUp, setShowMovieDetailsPopUp] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);

  const [poster, setPoster] = useState(null);
  const [backdropImg, setBackdropImg] = useState(null);
  const [movieDescription, setMovieDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    selectedGenre && getMoviesFromGenres(selectedGenre);
    !selectedGenre && getMovieOnSearch();
  }, [page, selectedGenre]);

  const getMoviesFromGenres = async (genreID) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=df6870b28b8bac6570172e8933e51d7e&sort_by=popularity.desc&with_genres=${genreID}&page=${page}`
    );
    try {
      console.log(response.data);
      setSearching(false);
      setSearchQuery("");
      setMovieDetails(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const movePageForwards = () => {
    setPage((prev) => prev + 1);
  };
  const movePageBackWords = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleGenreSelection = (genreID) => {
    setSelectedGenre(genreID);
    setPage(1);
  };

  const getMovieOnSearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=df6870b28b8bac6570172e8933e51d7e&page=${page}`
    );
    try {
      console.log(response.data);
      setSearching(true);
      setSelectedGenre(false);
      setTotalPages(response.data.total_pages);
      setSearchedMovieDetails(response.data.results);
    } catch (error) {
      console.log("Error getting movie", error);
    }
  };

  const getPerticularMovieDetails = (perticularMovie) => {
    handlePopUpDisplay();
    console.log(perticularMovie);
    setBackdropImg(perticularMovie.backdrop_path);
    setPoster(perticularMovie.poster_path);
    setMovieName(perticularMovie.title);
    setMovieDescription(perticularMovie.overview);
    setReleaseDate(perticularMovie.release_date);
  };

  const handlePopUpDisplay = () => {
    setShowMovieDetailsPopUp((prev) => !prev);
  };
  const processLike = () => {
    setLikeClicked((prev) => !prev);
  };

  return (
    <>
      <div className="genreBtn-container">
        {buttonList.map((genre) => (
          <button
            className={`genreBtn ${
              selectedGenre === genre.id ? "selected" : ""
            }`}
            onClick={() => handleGenreSelection(genre.id)}
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="search-container">
        <div className="search-icon-container">
          <img
            onClick={getMovieOnSearch}
            src={search}
            alt="search"
            className="search-icon"
          />
        </div>
        <input
          onChange={handleSearchQueryChange}
          className="search-input"
          type="text"
          value={searchQuery}
        />
      </div>
      {!searching && (
        <div className="all-movies-container">
          {movieDetails.map((movie) => (
            <div key={movie.title} className="movie-details-card">
              <div className="overlay-movie-details">
                <button
                  onClick={() => getPerticularMovieDetails(movie)}
                  className="show-details-btn"
                >
                  Show Details
                </button>
              </div>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="poster"
              />
              <p className="movie-name">
                {movie.title.length > 15
                  ? movie.title.substring(0, 22) + "..."
                  : movie.title}
              </p>
              <p className="release">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
      {searching && (
        <div className="all-movies-container">
          {searchedMovieDetails.map((movie) => (
            <div key={movie.id} className="movie-details-card">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="poster"
              />
              <p className="movie-name">
                {movie.title.length > 15
                  ? movie.title.substring(0, 22) + "..."
                  : movie.title}
              </p>
              <p className="release">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
      {(selectedGenre || totalPages > 1) && (
        <div className="page-container">
          <img
            src={next}
            className="previous"
            onClick={movePageBackWords}
            alt="Prev"
          />
          <label className="page-marker">
            {page}/{totalPages}
          </label>
          <img
            src={next}
            alt="next"
            className="next"
            onClick={movePageForwards}
          />
        </div>
      )}

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
              <img src={comment} alt="comment" className="social-icon" />
              <img src={share} alt="share" className="social-icon" />
            </div>
            <div className="perticular-movie-description">
              <label>{movieDescription}</label>
            </div>
            <div className="comments-container">
              <label className="comment">
                <span className="username">Shadman Khan:</span>Wonderful movie,
                really liked it
              </label>
              <label className="comment">
                <span className="username">Hamdan Khan:</span>It was really a
                great watch
              </label>
              <lable className="comment">
                <span className="username">MD. Sami Adnan:</span>Theres
                something i'd never forget about this movie
              </lable>
              <label className="comment">
                <span className="username">Faisal Khan:</span>Really great movie
              </label>
              <div className="comment-input-container">
                <input type="text" className="comment-input" />
                <button className="comment-btn">Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
