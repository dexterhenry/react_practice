import "./App.css"
import { TwitterFollowCard } from "./TiwtterFollowCard"

const users = [
  {
    userName: "dexterhenry",
    name: "Henry Dexter",
    isFollowing: false,
  },
  {
    userName: "midudev",
    name: "Miguel Duran",
    isFollowing: true,
  },
  {
    userName: "jonmircha",
    name: "Jonathan Charles",
    isFollowing: true,
  },
  {
    userName: "luiscarbonel1991",
    name: "Luis Carbonel",
    isFollowing: true,
  },
]

export const App = () => {
  const format = (userName) => `@${userName}`

  return (
    <section className="App">
      {users.map((user) => {
        const { isFollowing, userName, name } = user
        return (
          <TwitterFollowCard
            key={userName}
            formatUserName={format}
            isFollowing={isFollowing}
            userName={userName}
          >
            {name}
          </TwitterFollowCard>
        )
      })}
    </section>
  )
}
