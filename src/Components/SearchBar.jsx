import React, { useEffect, useState } from "react";
import axios from "axios";
import search from "../assets/search.png";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchPage,
  setSearchPage,
  setSearching,
  setSelectedGenre,
  setTotalPages,
  setSearchedMovieDetails,
  selectedGenre,
}) {
  useEffect(() => {
    !selectedGenre && getMovieOnSearch();
  }, [searchPage, selectedGenre]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterPress = (event) => {
    event.key === "Enter" && getMovieOnSearch();
  };

  const getMovieOnSearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=df6870b28b8bac6570172e8933e51d7e&page=${searchPage}`
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

  return (
    <>
      <div className="search-container">
        <div className="search-icon-container">
          <img
            onClick={() => {
              setSearchPage(1);
              getMovieOnSearch();
            }}
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
          onKeyDown={handleEnterPress}
        />
      </div>
    </>
  );
}
