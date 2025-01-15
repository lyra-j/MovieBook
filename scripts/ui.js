import { fetchMovies } from "./api.js"; // (완)

// 필요한 변수들 모아두기
const moviePostUl = document.getElementById("moviePostList"); // 영화 포스트 붙일곳
const searchInput = document.getElementById("searchInput"); // 검색어 input box
const movieModal = document.getElementById("movieModal"); // 모달창

//
let url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1"; // 기본 영화 목록 URL,한국어
let postArray = []; // 데이터를 저장할 빈 배열

//
//함수들 기록
//

// 1. 영화 정보 가져와서 붙이기(완)
const displayPosts = function (movies) {
  postArray = movies;

  let post_html = "";

  movies.forEach((movie) => {
    post_html += `
    <li class='movieItem' data-id='${movie.id}'>
    <div class='poster'>
    <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt='${movie.title}' />
    <div class='movieInfo'>
    <h3>${movie.title}</h3>
    <p>평점 :${movie.vote_average}</p>
    </div>
    </div>
    </li>
    `;
    moviePostUl.innerHTML = post_html;
  });
};

// 2. 모달 띄우기 (완)>
const openModal = function (e) {
  let movieItem = e.target.closest("li");
  // console.log(movieItem);

  if (movieItem && moviePostUl.contains(movieItem)) {
    const movieId = movieItem.getAttribute("data-id");
    const matchPost = postArray.find(function (movie) {
      return movie.id == movieId;
    });
    if (matchPost) {
      // console.log(matchPost.id); // 영화 ID를 출력
      renderPostDetails(matchPost);
      movieModal.style.display = "block";
    }
  }
};

// 3. 모달 닫기 (완)
const closeModal = function (e) {
  if (
    e.target.classList.contains("modalBackground") ||
    e.target.closest("span").classList.contains("close")
  ) {
    movieModal.style.display = "none";
  }
};

// 4. 모달 상세 내용 (완)
const renderPostDetails = function (movie) {
  let post_details = `<div class="modalDetail">
        <span class="close">&times;</span>
        <div class="modalPoster">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path} alt="${movie.title}" />
        </div>
        <div class="movieDetail">
          <h2 class="modalMovieTitle">${movie.title}</h2>
          <p class="modalMovieOverview">${movie.overview}</p>
          <span class="releaseDate">개봉일자 : ${movie.release_date}</span>
          <span class="rating">평점 : ⭐️ ${movie.vote_average}</span>
          <button type="button" class="addBookmark" data-id="${movie.id}">
          북마크 추가
        </button>
        </div>
        </div>
`;
  document.querySelector(".modalContent").innerHTML = post_details;
};

// 5. 키워드를 포함한 영화 목록 찾기
const searchMovies = function (searchKeyword) {
  let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko&page=1`;

  fetchMovies(searchUrl).then(function (movies) {
    displayPosts(movies);
  });
};

// 화면 표기하기 위해 함수 호출(완)
fetchMovies(url).then(function (movies) {
  // console.log(movies);
  displayPosts(movies);
});

// 모달 띄우기 호출
moviePostUl.addEventListener("click", function (e) {
  openModal(e);
});

// 모달 닫기 호출
movieModal.addEventListener("click", function (e) {
  closeModal(e);
});

// 엔터키로 검색 실행시 호출되는 함수
searchInput.addEventListener("keyup", function (e) {
  // 인풋박스에 들어온 값에서 앞 뒤 필요없는 공백값을 제거하고 모두 소문자로 변환 후 비교하여 찾기
  const searchKeyword = searchInput.value.trim().toLowerCase();

  if (e.key === "Enter") {
    searchMovies(searchKeyword);
  }
});
