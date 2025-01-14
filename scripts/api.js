const API_KEY = config.apikey;
const API_TOKEN = config.apitoken;

export const fetchMovies = async function (url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzY0YjI4YmE4ZTZkZmI2ZDk5MDM1MTFiMWQ5YTZiNiIsIm5iZiI6MTczNjI5OTIzMS45OTksInN1YiI6IjY3N2RkMmRmYjExZDA4ODExMTdhZmI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VDEs6r06dGBrz9upC8DJ_AQ9ZRaHuwuX6Srs0DKJBdo",
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("API 에러 발생 > ", err);
    return [];
  }
};
