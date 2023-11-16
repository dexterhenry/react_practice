import { useState } from "react"


export function TwitterFollowCard({ children, userName, initialIsFallowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFallowing)

  const fallowBtnText = isFollowing ? "Fallowing" : "Fallow"
  const stopFallowBtnText = "Stop fallow"
  const btnClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button"

  const handleChange = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          alt="Avatar of henrydex"
          src={`https://unavatar.io/${userName}`}
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong>
          <span className="tw-followCard-infoUserName">@{userName}</span>
        </div>
      </header>
      <aside>
        <button onClick={handleChange} className={btnClassName}>
          <span className="tw-followCard-text">{fallowBtnText}</span>
          <span className="tw-followCard-stopFollow">{stopFallowBtnText}</span>
        </button>
      </aside>
    </article>
  )
}
