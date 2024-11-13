import React, { useEffect, useState } from "react";
import { buttonList } from "../Data/Data.js";
import axios from "axios";
import next from "../assets/next.png";
import search from "../assets/search.png";

export default function Home() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    selectedGenre && getMoviesFromGenres(selectedGenre);
  }, [page, selectedGenre]);

  const getMoviesFromGenres = async (genreID) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=df6870b28b8bac6570172e8933e51d7e&sort_by=popularity.desc&with_genres=${genreID}&page=${page}`
    );
    try {
      console.log(response.data);
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
          <img src={search} alt="search" className="search-icon" />
        </div>
        <input
          onChange={handleSearchQueryChange}
          className="search-input"
          type="text"
          value={searchQuery}
        />
      </div>
      <div className="all-movies-container">
        {movieDetails.map((movie) => (
          <div key={movie.title} className="movie-details-card">
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
      {selectedGenre && (
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
    </>
  );
}

//import { DATA } from "../Data/Data.js";
// const [filteredGenreMovies, setFilteredGenreMovies] = useState([]);

// const [selectedGenres, setSelectedGenres] = useState(new Set());

//const filterMovies = (genre) => {
//     const updatedGenres = new Set(selectedGenres);

//     updatedGenres.has(genre)
//       ? updatedGenres.delete(genre)
//       : updatedGenres.add(genre);

//     setSelectedGenres(updatedGenres);

//     const filteredMovies = DATA.filter((movie) =>
//       movie.Genre.some((movieGenre) => updatedGenres.has(movieGenre))
//     );

//     setFilteredGenreMovies(filteredMovies);
//   };
