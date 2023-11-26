import { useState, useMemo, useRef, useCallback } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previouseSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (previouseSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previouseSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return {
    error,
    getMovies,
    loading,
    movies: sortedMovies,
  }
}
