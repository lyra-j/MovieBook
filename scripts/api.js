const API_KEY = config.apikey;

function getMovies() {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };


  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const dataIndex = data["results"];
      const movieList = document.querySelector("#movie-container");

      movieList.innerHTML = "";

      dataIndex.forEach((e) => {
        const movie_id = e["id"];
        const movie_poster =
          "https://image.tmdb.org/t/p/w500/" + e["poster_path"];
        const movie_title = e["title"];
        const movie_average = e["vote_average"];

        let temp_html = `<div class="movieCards">
      <img src="${movie_poster}" alt="${movie_title}" />
      <div>
        <h3>${movie_title}</h3>
        <p>평점 : ${movie_average}</p>
      </div>
    </div>`;
        const movieDiv = document.createElement("div");
        movieDiv.innerHTML = temp_html;
        movieList.appendChild(movieDiv);
      });
    })
    .catch((err) => console.error(err));
}

getMovies();
