import { useEffect, useMemo, useRef, useState } from "react"
import "./App.css"
import { SortBy, type User } from "./types.d"
import { UserList } from "./components/UserList"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const initialState = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const handleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const deleteUser = (email: string) => {
    const newUsers = users.filter((user) => user.email !== email)
    setUsers(newUsers)
  }

  const handleResetUsers = () => {
    setUsers([...initialState.current])
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => {
        const newState = res.results
        setUsers(newState)
        initialState.current = [...newState]
      })
      .catch((error) => {
        console.log({ error })
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortedUser = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Technical test</h1>
      <header>
        <button onClick={toggleColors}>Change Colors</button>
        <button onClick={handleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "Not Sort by Country"
            : "Sort by Country "}
        </button>
        <button onClick={handleResetUsers}> Reset data </button>
        <input
          placeholder='Filter by Country'
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        <UserList
          users={sortedUser}
          showColors={showColors}
          handleDelete={deleteUser}
          changeSorting={handleChangeSort}
        />
      </main>
    </div>
  )
}

export default App
