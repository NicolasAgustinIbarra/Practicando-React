import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { TURNS } from './constans';
import { checkWinnerFrom } from './logic';
import { WinnerModal } from './components/WinnerModal';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board');
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnsFromLocalStorage = window.localStorage.getItem('turn');
    return turnsFromLocalStorage || TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    if (board[index] !== null || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    } else {
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);

      window.localStorage.setItem('board', JSON.stringify(newBoard));
      window.localStorage.setItem('turn', newTurn); // Aquí se guarda como simple cadena, no JSON
    }
  };

  return (
    <main className="board">
      <h1>Tic-tac-toe de Nico</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((_, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {board[index]}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
