import React, { useEffect, useState } from "react";
import { buttonList } from "../Data/Data.js";
import axios from "axios";
import next from "../assets/next.png";
import SearchBar from "./SearchBar.jsx";
import MovieList from "./MovieList.jsx";

export default function Home() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchedMovieDetails, setSearchedMovieDetails] = useState([]);

  useEffect(() => {
    selectedGenre && getMoviesFromGenres(selectedGenre);
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

  const movePageForwards = () => {
    searching ? setSearchPage((prev) => prev + 1) : setPage((prev) => prev + 1);
  };
  const movePageBackWords = () => {
    searching
      ? setSearchPage((prev) => (prev > 1 ? prev - 1 : prev))
      : setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleGenreSelection = (genreID) => {
    setSelectedGenre(genreID);
    setPage(1);
    setSearchPage(1);
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

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPage={searchPage}
        setSearchPage={setSearchPage}
        searching={searching}
        setSearching={setSearching}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        setTotalPages={setTotalPages}
        searchedMovieDetails={searchedMovieDetails}
        setSearchedMovieDetails={setSearchedMovieDetails}
        setPage={setPage}
      />

      <MovieList
        searching={searching}
        movieDetails={movieDetails}
        searchedMovieDetails={searchedMovieDetails}
      />

      {(selectedGenre || totalPages > 1) && (
        <div className="page-container">
          <img
            src={next}
            className="previous"
            onClick={movePageBackWords}
            alt="Prev"
          />
          <label className="page-marker">
            {searching ? searchPage : page}/{totalPages}
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
