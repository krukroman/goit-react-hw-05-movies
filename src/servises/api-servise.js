const API_KEY = 'bb47124fe990b3a04ccb5a994cf49456';
const BASE_URL = 'https://api.themoviedb.org/3/';

//

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);
  const parsedResponse = await response.json();
  return response.ok
    ? parsedResponse
    : Promise.reject(new Error(`${parsedResponse.status_message}`));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchSearchingMovies(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=true`,
  );
}

export function fetchMovieCast(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`,
  );
}

export function fetchMovieReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`,
  );
}
