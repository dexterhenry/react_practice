export const Square = ({ children, isSelecterd, updateBoard, index }) => {
  const className = `square ${isSelecterd ? "is-selected" : ""}`

  const handleClick = () => {
    updateBoard()
  }

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  )
}
