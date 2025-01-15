import { config } from "./apikey.js";

const API_KEY = config.apikey;
const API_TOKEN = config.apitoken;

export const fetchMovies = async function (url) {
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
    return data.results;
  } catch (err) {
    console.error("API 에러 발생 > ", err);
    return [];
  }
};
