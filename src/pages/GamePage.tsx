import { useState, useEffect } from "react";
import Square from "../components/Square";
import ScoreBoard from "../components/ScoreBoard";
import type { Player, Score } from "../types";

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function GamePage() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState<Score>({ X: 0, O: 0, Ties: 0 });
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine([a, b, c]);
        updateScore(board[a]);
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner('Draw');
      updateScore('Draw');
    }
  };