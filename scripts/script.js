import { fetchMovies } from "./api.js"; // (완)
import { postArray, moviePostUl, displayPosts, drawPostDetails } from "./ui.js";

// 필요한 변수들 모아두기
const searchInput = document.getElementById("searchInput"); // 검색어 input box
const movieModal = document.getElementById("movieModal"); // 모달창
///
let url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1"; // 기본 영화 목록 URL,한국어

//
//함수들 기록
//

// 1. 모달 띄우기 (완)>
const openModal = function (e) {
  /// 선택된 요소중에서 가장 가까운 <li>를 찾아서 반환
  let movieItem = e.target.closest("li");
  // console.log(movieItem);

  /// movieItem에 저장된 값이 있고 moviePostUl하위요소에 movieItem이 있다면
  /// movieItem에서 data-id속성 가져와서 postArray배열에 있는 내용중 id가 일치하는 첫번째 요소 반환
  if (movieItem && moviePostUl.contains(movieItem)) {
    const movieId = movieItem.getAttribute("data-id");
    const matchPost = postArray.find(function (movie) {
      return movie.id == movieId;
    });

    /// id가 일치하는 matchPost가 있다면 해당 내용을 표기하고 모달창을 보이도록 하기
    if (matchPost) {
      // console.log(matchPost.id); // 영화 ID를 출력확인
      drawPostDetails(matchPost);
      movieModal.style.display = "block";
    }
  }
};

// 2. 모달 닫기 (완)
const closeModal = function (e) {
  /// 모달창이 띄워진 후 배경의 반투명한 부분을 선택하거나, close 클래스를가진 <span>을 선택하면 모달창을 보이지 않게 숨기기
  if (
    e.target.classList.contains("modalBackground") ||
    e.target.closest("span").classList.contains("close")
  ) {
    movieModal.style.display = "none";
  }
};

// 3. 키워드를 포함한 영화 목록 찾기
const searchMovies = function (searchKeyword) {
  let searchUrl =
    searchKeyword.length > 0
      ? `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko&page=1`
      : url;

  fetchMovies(searchUrl).then(function (movies) {
    if (movies.length === 0) {
      alert("검색된 영화가 없습니다. 다시 확인해주세요!");
    }
    displayPosts(movies);
  });
};

// 최초 화면 표기하기 위해 함수 호출(완)
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
  /// 인풋박스에 들어온 값에서 앞 뒤 필요없는 공백값을 제거하고 모두 소문자로 변환 후 비교하여 찾기
  const searchKeyword = searchInput.value.trim().toLowerCase();

  if (e.key === "Enter") {
    !searchKeyword
      ? alert("검색어를 입력하세요.")
      : searchMovies(searchKeyword);
  }
});
