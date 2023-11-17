import { useState } from "react"
import "./App.css"
import confetti from "canvas-confetti"
import { TURNS } from "./assets/constants"
import { checkEndGame, checkWinner } from "./assets/logic/board"
import { WinnerModal } from "./assets/components/WinnerModal"
import { Board } from "./assets/components/Board"
import { Turn } from "./assets/components/Turn"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = JSON.parse(
      window.localStorage.getItem("board")
    )
    return boardFromLocalStorage || Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn")
    return turnFromLocalStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => () => {
    //Do not update position if it already has value
    if (board[index] || winner) return

    //update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //update turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //saved game data
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} board={board} handleReset={resetGame} />
      <WinnerModal winner={winner} handleReset={resetGame} />
    </main>
  )
}

export default App
