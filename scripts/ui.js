export const moviePostUl = document.getElementById("moviePostList"); // 영화 포스트 붙일곳
export let postArray = []; // 데이터를 저장할 빈 배열

// 1. 영화 정보 가져와서 붙이기(완)
export const displayPosts = function (movies) {
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

// 2. 모달 상세 내용 (완)
export const drawPostDetails = function (movie) {
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
