import { config } from "./apikey.js";

const API_KEY = config.apikey;
const API_TOKEN = config.apitoken;

export const fetchMovies = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN || API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results; // .results 빼먹어서 내가 원하는 데이터 값을 반환하지 못했다..ㅠ
  } catch (err) {
    console.error("<< API 에러 발생 >> ", err);
  }
};
