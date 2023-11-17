import { TURNS } from "../constants"
import { Square } from "./Square"

export function Turn({ turn, board, handleReset }) {
  return (
    <>
      <section className="turn">
        <Square isSelecterd={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelecterd={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section className="turn">
        {board.some((item) => item != null) && (
          <button onClick={handleReset}> Restart </button>
        )}
      </section>
    </>
  )
}
