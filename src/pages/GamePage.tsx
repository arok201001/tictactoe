import { useState, useEffect } from "react";
import { Trophy, RotateCw } from "lucide-react";
import Square from "../components/Square";
import ScoreBoard from "../components/ScoreBoard";
import type { Player, Score } from "../types";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCj4vNmQfednODlZ8KmB8hitaKacLsadmw",
  authDomain: "tictactoe-16219.firebaseapp.com",
  databaseURL: "https://tictactoe-16219-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "tictactoe-16219",
  storageBucket: "tictactoe-16219.firebasestorage.app",
  messagingSenderId: "21488013840",
  appId: "1:21488013840:web:4eb62a7edd8a0542e0b095",
  measurementId: "G-MX7TKS63TL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

  const updateScore = (result: Player | 'Draw') => {
    setScores(prev => ({
      ...prev,
      [result === 'Draw' ? 'Ties' : result as string]: prev[result === 'Draw' ? 'Ties' : result as keyof Score] + 1
    }));
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
  };

  const handleResetScores = () => {
    handleNewGame();
    setScores({ X: 0, O: 0, Ties: 0 });
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#101726] pt-10 px-4 font-sans">
      
      <h1 className="text-white text-3xl font-light tracking-widest mb-8">TIC TAC TOE</h1>

      <ScoreBoard scores={scores} xIsNext={xIsNext} />

      <div className="grid grid-cols-3 gap-3 p-4 bg-[#152034] rounded-2xl shadow-2xl mb-6">
        {board.map((value, index) => (
          <Square 
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
            isWinningSquare={winningLine?.includes(index) ?? false}
          />
        ))}
      </div>

      {winner && (
        <div className="w-full max-w-[320px] bg-[#3f2e18] border border-yellow-500/30 rounded-2xl p-6 mb-4 flex flex-col items-center shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-in fade-in zoom-in">
          <Trophy className="w-10 h-10 text-yellow-400 mb-2" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">VICTORY!</h2>
          <p className="text-[#00cedd] font-medium mt-1">
            {winner === 'Draw' ? "It's a Tie!" : `Player ${winner} Wins`}
          </p>
        </div>
      )}

      <div className="flex gap-4 w-full max-w-[320px]">
        <button 
          onClick={handleNewGame}
          className="flex-1 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <RotateCw size={18} />
          New Game
        </button>

        <button 
          onClick={handleResetScores}
          className="bg-[#1e293b] hover:bg-[#334155] text-[#8d9db5] font-semibold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          Reset
        </button>
      </div>

    </div>
  );
}