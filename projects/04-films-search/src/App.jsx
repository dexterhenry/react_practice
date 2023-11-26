import "./App.css"
import { useState } from "react"
import { Movies } from "./assets/components/Movies"
import { useMovies } from "./assets/hooks/useMovies"
import { useSearch } from "./assets/hooks/useSearch"

import debounce from "just-debounce-it"
import { useCallback } from "react"

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debauncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300),
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSeacrh = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debauncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Film search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleSeacrh}
            placeholder='Avenger, Start Wars, The matrix....'
            value={search}
          />
          <input
            type='checkbox'
            name='sort'
            onClick={handleSort}
            checked={sort}
          />
          <button type='submit'>Search </button>
        </form>
      </header>
      <main>{loading ? <p> Loading ... </p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
