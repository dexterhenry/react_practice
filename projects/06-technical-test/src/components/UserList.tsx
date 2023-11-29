import "./UserList.css"

import { SortBy, type User } from "../types.d"

interface Props {
  changeSorting: (sort: SortBy) => void
  handleDelete: (email: string) => void
  users: User[]
  showColors: boolean
}

export function UserList({
  users,
  showColors,
  handleDelete,
  changeSorting,
}: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Picture</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.LAST)}>
            Last name
          </th>
          <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>
            Name
          </th>
          <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555"
          const color = showColors ? backgroundColor : "transparent"
          return (
            <tr
              key={user.email}
              style={{
                backgroundColor: color,
              }}
            >
              <td>
                <img src={user.picture.thumbnail} alt='' />
              </td>
              <td>
                <span> {user.name.first}</span>
              </td>
              <td>
                <span> {user.name.last}</span>
              </td>
              <td>
                <span>{user.location.country}</span>
              </td>
              <td>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
