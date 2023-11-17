import { Square } from "./Square"

export function WinnerModal({ children, winner, handleReset }) {
  if (winner === null) return null
    const winnerText = winner  === false ? "Tie" : "Win"

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        {winner && (
          <header className="win">
            <Square> {winner} </Square>
          </header>
        )}
        <footer>
          <button onClick={handleReset}> Restart </button>
        </footer>
      </div>
    </section>
  )
}
