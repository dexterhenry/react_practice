import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"

export function useSearch() {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }

    if (search === "") {
      setError("Can't search for an empty movie")
      return
    }

    if (search.match(/^\d+$/)) {
      setError("Can't search for a movie with number")
      return
    }

    if (search.length < 3) {
      setError("The search must be at least 3 characters")
      return
    }

    setError(null)
  }, [search])
  return { search, setSearch, error }
}
