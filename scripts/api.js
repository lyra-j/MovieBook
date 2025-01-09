const API_KEY = config.apikey;
const API_TOKEN = config.apitoken;

function getMovies() {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const dataIndex = data["results"]; // 받아온 자료들 할당
      const movieList = document.querySelector("#movie-list");

      movieList.innerHTML = "";

      dataIndex.forEach((e) => {
        const movie_id = e["id"];
        const movie_poster =
          "https://image.tmdb.org/t/p/w500/" + e["poster_path"];
        const movie_title = e["title"];
        const movie_average = e["vote_average"];

        let temp_html = `<img class="thumbnail" src="${movie_poster}" alt="${movie_title}" />
      <div>
        <h3>${movie_title}</h3>
        <p>평점 : ${movie_average}</p>
      </div>`;
        const movieDiv = document.createElement("div"); // 컨텐츠가 들어갈 div 박스 생성 후 클래스명 주기
        movieDiv.className += "movieCards";
        movieDiv.innerHTML = temp_html; //  받아온 자료로 html에 원하는 값만 붙여넣기
        movieList.appendChild(movieDiv); // movieList의 하위 노드로 붙여 넣기
      });
    })
    .catch((err) => console.error(err));
}

getMovies();
