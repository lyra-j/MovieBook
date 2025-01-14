import { fetchMovies } from "./api.js"; // (완)

// 필요한 변수들 모아두기
const moviePostUl = document.getElementById("moviePostList"); // 영화 포스트 붙일곳
const searchInput = document.getElementById("searchInput"); // 검색어 input box
const movieModal = document.getElementById("movieModal"); // 모달창
const modalClose = document.querySelector(".close"); // 모달 닫기 버튼

//
let url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1"; // 기본 영화 목록 URL,한국어
let postArray = []; // 검색을 위해 데이터를 저장할 빈 배열

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

// 화면 표기하기 위해 함수 호출(완)
fetchMovies(url).then(function (movies) {
  // console.log(movies);
  displayPosts(movies);
});

// 2. 모달 띄우기 (완)>
const openModal = function (e) {
  let movieItem = e.target.closest("li");

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
  if (e.target.closest("button").classList.contains("close")) {
    movieModal.style.display = "none";
  }
};

// 4. 모달 상세 내용
const renderPostDetails = function (movie) {
  let post_details = `<div class="modalDetail">
        <div class="modalPoster">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path} alt="${movie.title}" />
        </div>
        <div>
          <h2 class="modalMovieTitle">${movie.title}</h2>
          <p class="modalMovieOverview">${movie.overview}</p>
          <span class="releaseDate">개봉일자 : ${movie.release_date}</span>
          <span class="rating">평점 : ${movie.vote_average}</span>
          <button type="button" class="addBookmark" data-id="${movie.id}">
          북마크 추가
        </button>
        </div>
        <button type="button" class="close">&times;</button>
        </div>
`;
  document.querySelector(".modalContent").innerHTML = post_details;
};

moviePostUl.addEventListener("click", function (e) {
  openModal(e);
});

movieModal.addEventListener("click", function (e) {
  closeModal(e);
});

// 여기까지는 확인 완료

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
  // 기존 영화 목록 삭제
  movieList.innerHTML = "";

  if (searchText === "") {
    displayMovies(movies);
    return;
  }

  const filteredMovies = filtering(movies, searchText);
  displayMovies(filteredMovies);
}

// document.getElementById("searchInput").addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     const keyword = document.getElementById("searchInput").vlaue.trim();
//     if (keyword) {
//       search(keyword);
//     }
//   }
// });
