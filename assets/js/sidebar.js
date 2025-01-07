"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

 

export function sidebar() {

  //fetch all genres eg: [{"id": "123", "name": "Action"}] and changes the format eg: {123: "Action"}
  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    });

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
      <div class="sidebar-list">
          <p class="tittle">Genre</p>
        </div>


        <div class="sidebar-list">
          <p class="tittle">Language</p>

          <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>

          <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=yo", "Yoruba")'>Yoruba</a>

          <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=fr", "French")'>French</a>
        </div> 


        <div class="sidebar-footer">
        <p class="copyright">copyright 2025 maggie</p>

        <img
          src="./assets/images/tmdb-logo.svg"
          width="100"
          height="17"
          alt="the movie database logo"
        />
      </div>
`;



const genreLink = function () {
  for (const [genreId, genreName] of Object.entries(genreList)) {

    const link = document.createElement("a");
    link.classList.add("sidebar-link");
    link.setAttribute("href", "./movie-list.html");
    link.setAttribute("menu-close", "");
    link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
    link.textContent = genreName;

    sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
  }

  const sidebar = document.querySelector("[sidebar]");
  sidebar.appendChild(sidebarInner);
  toggleSidebar(sidebar);
};


//Toggle sidebar in mobile sreen
const toggleSidebar = function (sidebar) {

   
    console.log("Toggle Sidebar function is called");
    // ... rest of your code
  
  

  const sidebarBtn = document.querySelector("[menu-btn]");
  const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
  const sidebarClose = document.querySelectorAll("[menu-close]");
  const overlay = document.querySelector("[overlay]");

  addEventOnElements(sidebarTogglers, "click", function () {
    console.log("Menu Toggler Clicked");

    sidebar.classList.toggle("active");
    sidebarBtn.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  addEventOnElements(sidebarClose, "click", function () {
    sidebar.classList.remove("active");
    sidebarBtn.classList.remove("active");
    overlay.classList.remove("active");
  });
};

}
 