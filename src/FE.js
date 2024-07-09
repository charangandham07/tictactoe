import React, { useState, useEffect } from "react";
import "./style.css"; // Make sure this file exists in the same directory

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X"? "O" : "X"));
  };

  const calculateWinner = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const handleReset = () => {
    resetGame();
  };

  useEffect(() => {
    const winner = calculateWinner();
    setWinner(winner);
  }, [board, calculateWinner]); // Add calculateWinner to the dependency array

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((square, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {square}
          </div>
        ))}
      </div>
      <div className="info">
        <h2>{winner? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}</h2>
        <button id="resetbutton" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TicTacToe;