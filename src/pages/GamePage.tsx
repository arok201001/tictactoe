import React, { useState, useEffect, useRef } from "react";
import { Trophy, RotateCw } from "lucide-react";
import Square from "../components/Square";
import ScoreBoard from "../components/ScoreBoard";
import type { Player, Score } from "../types";
import { ref, set, onValue, get } from "firebase/database";
import { db } from "../firebase";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function GamePage() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState<Score>({ X: 0, O: 0, Ties: 0 });
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // = Firebase multiplayer logic
  const [room, setRoom] = useState<string | null>(null);
  const [mySymbol, setMySymbol] = useState<"X" | "O" | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [playerId] = useState(
    () => `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  //

  //
  const isWritingToFirebase = useRef(false);
  const isFirstLoad = useRef(true);
  const lastBoardHash = useRef<string>("");
  //

  //
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");

    if (roomParam) {
      setRoom(roomParam);

      const assignPlayer = async () => {
        const playersRef = ref(db, `gamePlayers/${roomParam}`);
        const snapshot = await get(playersRef);
        const players = snapshot.val() || {};

        const playerList = Object.values(players);
        const xCount = playerList.filter((s) => s === "X").length;
        const oCount = playerList.filter((s) => s === "O").length;

        let symbol: "X" | "O";

        if (xCount <= oCount) {
          symbol = "X";
        } else {
          symbol = "O";
        }

        await set(ref(db, `gamePlayers/${roomParam}/${playerId}`), symbol);
        setMySymbol(symbol);
        localStorage.setItem(`player_${roomParam}`, symbol);

        console.log(`You are player: ${symbol}`);
        setIsInitialized(true);
      };

      assignPlayer();
    }
  }, [playerId]);
  //

  //
  useEffect(() => {
    if (!room || !isInitialized) return;

    const gameRef = ref(db, `games/${room}`);

    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      if (isWritingToFirebase.current) {
        isWritingToFirebase.current = false;
        return;
      }

      const boardData = data.board || {};
      const newBoard: Player[] = Array(9).fill(null);

      for (let i = 0; i < 9; i++) {
        const value = boardData[i];
        if (value === "X" || value === "O") {
          newBoard[i] = value;
        }
      }

      //
      const newBoardHash = newBoard.join("");
      if (lastBoardHash.current === newBoardHash) return;
      lastBoardHash.current = newBoardHash;

      setBoard(newBoard);
      setXIsNext(data.xIsNext !== undefined ? data.xIsNext : true);
      setWinner(data.winner || null);
      setWinningLine(data.winningLine || null);

      if (data.scores) {
        setScores(data.scores);
      }
    });

    return () => unsubscribe();
  }, [room, isInitialized]);
  //

  // Din kod ändrad pga infinite win loop, useEffect orsakade extra rerenders 
  // när boarden uppdaterades: 
  // tog bort useEffect, lagt till true/false, funktionen nu anropas i handleSquareClick.
  const checkWinner = (currentBoard: Player[]) => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        const winnerSymbol = currentBoard[a];
        setWinner(winnerSymbol);
        setWinningLine([a, b, c]);

        setScores((prev) => ({
          ...prev,
          [winnerSymbol]: prev[winnerSymbol] + 1,
        }));
        return true;
      }
    }

    if (!currentBoard.includes(null) && !winner) {
      setWinner("Draw");
      setScores((prev) => ({
        ...prev,
        Ties: prev.Ties + 1,
      }));
      return true;
    }

    return false;
  };

  //
  useEffect(() => {
    if (!room || !mySymbol || !isInitialized) return;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    isWritingToFirebase.current = true;

    const boardObject: Record<number, Player | null> = {};
    board.forEach((value, index) => {
      boardObject[index] = value;
    });

    set(ref(db, `games/${room}`), {
      board: boardObject,
      xIsNext,
      winner,
      winningLine,
      scores,
    }).catch((error) => {
      console.error("Error writing to Firebase:", error);
      isWritingToFirebase.current = false;
    });
  }, [
    board,
    xIsNext,
    winner,
    winningLine,
    scores,
    room,
    mySymbol,
    isInitialized,
  ]);
  //

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return;

    //
    if (mySymbol) {
      const isMyTurn =
        (xIsNext && mySymbol === "X") || (!xIsNext && mySymbol === "O");
      if (!isMyTurn) {
        alert(`Wait! It's ${xIsNext ? "X" : "O"}'s turn. You are ${mySymbol}`);
        return;
      }
    }
    //

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    checkWinner(newBoard);

    setXIsNext(!xIsNext);
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setXIsNext(true);
    //
    lastBoardHash.current = "";
    //
  };

  const handleResetScores = () => {
    handleNewGame();
    setScores({ X: 0, O: 0, Ties: 0 });
  };

  return (
    <div className="h-210 overflow-y-auto flex flex-col items-center min-h-screen bg-[#101726] pt-10 px-4 font-sans">
      <h1 className="text-white text-3xl font-light tracking-widest mb-8">
        TIC TAC TOE
      </h1>

      <ScoreBoard scores={scores} xIsNext={xIsNext} />

      {/* Player info*/}
      <div className="mb-4 text-center">
        {room && mySymbol && (
          <>
            <div className="text-white text-lg">
              You are:{" "}
              <span
                className={`font-bold text-2xl ${
                  mySymbol === "X" ? "text-blue-400" : "text-red-400"
                }`}
              >
                {mySymbol}
              </span>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {xIsNext ? (
                <span className="text-blue-300">
                  Current turn: <span className="font-bold">X</span>
                </span>
              ) : (
                <span className="text-red-300">
                  Current turn: <span className="font-bold">O</span>
                </span>
              )}
            </div>
          </>
        )}
        {room && !mySymbol && (
          <div className="text-yellow-400">Connecting to game...</div>
        )}
      </div>
      {/* */}

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
        <div className="w-full max-w-[320px] bg-[#3f2e18] border border-yellow-500/30 rounded-2xl p-6 mb-4 flex flex-col items-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <Trophy className="w-10 h-10 text-yellow-400 mb-2" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">
            VICTORY!
          </h2>
          <p className="text-[#00cedd] font-medium mt-1">
            {winner === "Draw" ? "It's a Tie!" : `Player ${winner} Wins`}
          </p>
        </div>
      )}

      <div className="flex gap-4 w-full max-w-[320px]">
        <button
          onClick={handleNewGame}
          className="flex-1 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <RotateCw size={18} />
          New Game
        </button>

        <button
          onClick={handleResetScores}
          className="bg-[#1e293b] hover:bg-[#334155] text-[#8d9db5] font-semibold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
