"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
 
export function search() {
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchField = document.querySelector(".search-field");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);

  // Function to hide default scroll bar when search modal is active
  function hideSearchModal() {
    document.querySelector(".search-modal").classList.remove("active");
    document.body.classList.remove("modal-active"); // Remove the class from the body
  }

  let searchTimeout;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");

      document.body.classList.remove("modal-active");

      clearTimeout(searchTimeout);
      return;
    }

    searchResultModal.classList.add("active");
    document.body.classList.add("modal-active");

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
      const searchTerm = searchField.value.trim();
      const formattedSearchTerm =
        searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();

      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&include_adult=false&language=en-US&page=1&query=${searchField.value}`,
        function ({ results: movieList }) {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = ""; //remove old results

          searchResultModal.innerHTML = `
              <p class="label">Results for</p>

              <h1 class="heading title-modal">${formattedSearchTerm}</h1>
      
              <div class="movie-list modal-movie">
                  <div class="grid-list ss"></div>
              </div>
              `;

          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);

            searchResultModal
              .querySelector(".grid-list")
              .appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
}
