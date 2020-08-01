const key = "?api_key=1a5c38a0538233d1f18817f70dfb75a2&language=es_Es";
const url = "https://api.themoviedb.org/3";
const discoverMovie = "/discover/movie";
const genreMovie = "/genre/movie/list";
const movie = "/movie/";

function getMovies(page, genre, sort) {
  let genreString = "";
  let sortString = `&sort_by=${sort}`;
  if (genre != "All") {
    genreString = `&with_genres=${genre}`;
  }

  return fetch(
    `${url}${discoverMovie}${key}${genreString}&page=${page}${sortString}`
  )
    .then(res => res.json())
    .then(res => res.results);
}
function getGenres() {
  return fetch(`${url}${genreMovie}${key}`)
    .then(res => res.json())
    .then(res => res.genres);
}
function getMovie(id) {
  return fetch(`${url}${movie}${id}${key}`).then(res => res.json());
}
export default {
  getMovies,
  getMovie,
  getGenres
};
