import { Square } from "./Square"

export function Board({ board, updateBoard }) {
  return (
    <section className="game">
      {board.map((_, index) => (
        <Square key={index} index={index} updateBoard={updateBoard(index)}>
          {board[index]}
        </Square>
      ))}
    </section>
  )
}
