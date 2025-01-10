// 영화 정보 fetch >>> api.js수정하며 import형식으로 변경하기
function fetchMovies() {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      movies = response.results; // 영화 데이터를 배열에 저장
      displayMovies(movies); // 영화 카드 표시 함수 호출
    })
    .catch((err) => console.error(err));
}

// 영화 카드 html 표시
function displayMovies(movies) {
  const movieList = document.getElementById("movieList");

  movies.forEach((movie) => {
    const temp_html = `<img class="thumbnail" src="${movie.poster_path}" alt="${movie.title}" />
  <div>
    <h3>${movie.title}</h3>
    <p>평점 : ${movie.vote_average}</p>
  </div>`;

    const movieDiv = document.createElement("div"); // 컨텐츠가 들어갈 div 박스 생성 후 클래스명 주기
    movieDiv.className += "movieCards";
    movieDiv.innerHTML = temp_html; //  받아온 자료로 html에 원하는 값만 붙여넣기
    movieList.appendChild(movieDiv); // movieList의 하위 노드로 붙여 넣기
  });
}

// 키워드로 영화 필터링 >>>>>다시 확인
function filtering(data, search) {
  const searchKeywords = search.toLowerCase().split(" ");

  return data.filter((movie) => {
    const movieTitle = movie.title.toLowerCase().replace(/\s/g, "");

    return searchKeywords.every((keyword) => movieTitle.includes(keyword));
  });
}

// 검색 실행시 호출되는 함수
function search() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.Value.trim().toLowerCase();
  const movieList = document.getElementById("movieList");

  // 기존 영화 목록 삭제
  movieList.innerHTML = "";

  if (searchText === "") {
    displayMovies(movies);
    return;
  }

  const filteredMovies = filtering(movies, searchText);
  displayMovies(filteredMovies);
}
