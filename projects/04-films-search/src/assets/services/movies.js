import { API_URL } from "../config/constant"

export const searchMovies = async ({ search }) => {
  try {
    const response = await fetch(`${API_URL}${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }))
  } catch (error) {
    throw new Error("Error searchin movies")
  }
}
