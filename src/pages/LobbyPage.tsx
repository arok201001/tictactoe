import { useState, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "../firebase";

export default function Lobby() {
  const [roomCode, setRoomCode] = useState("");
  const [playersList, setPlayersList] = useState<string[]>([]);
  const [joinCode, setJoinCode] = useState("");

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    const roomRef = ref(db, `rooms/${code}`); // reference till nya rummet 
    
    set(roomRef, { // inital data
      players: ["Player 1"],
      createdAt: Date.now() // timestamp
    });
  };

  const joinRoom = async () => {
    if (!joinCode.trim()) return;
    
    const { get } = await import("firebase/database");
    const roomRef = ref(db, `rooms/${joinCode}`); // reference för requested room
    const snapshot = await get(roomRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const playerCount = data.players?.length || 0;
      
      if (playerCount >= 2) {
        alert("Room is full!");
        return;
      }
      
      const updatedPlayers = [ // update to list
        ...(data.players || []),
        `Player ${playerCount + 1}`
      ];
      
      await set(ref(db, `rooms/${joinCode}`), { // uptade room with new players
        ...data,
        players: updatedPlayers
      });
      setRoomCode(joinCode);
    } else {
      alert("Room not found!");
    }
  };

  useEffect(() => { // listener
    if (!roomCode) return; // Only if we have a room
    
    const roomRef = ref(db, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setPlayersList(data?.players || []);
    });
    
    return () => unsubscribe();
  }, [roomCode]);

  const leaveLobby = () => {
    if (roomCode) {
      remove(ref(db, `rooms/${roomCode}`));
    }
    setRoomCode("");
    setPlayersList([]);
  };

  const startGame = () => {
    window.location.href = `/game?room=${roomCode}`;
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90 min-w-90">
      <h1 className="text-white text-3xl mt-3">MULTIPLAYER LOBBY</h1>
      
      {!roomCode ? (
        <>
          <button 
            onClick={createRoom}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg mt-6"
          >
            Create Room
          </button>
          
          <div className="mt-6 text-white">OR</div>
          
          <div className="mt-4 flex gap-2">
            <input 
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code"
              className="p-3 rounded-lg bg-[#1e293b] text-white border border-gray-600 w-48"
              maxLength={6}
            />
            <button 
              onClick={joinRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Join
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 text-center">
            <h3 className="text-[#8d9db5]">Room Code:</h3>
            <h2 className="text-white text-2xl font-bold tracking-wider">{roomCode}</h2>
          </div>
          
          <div className="mt-6 w-full">
            <h4 className="text-white mb-2">Players ({playersList.length}/2):</h4>
            {playersList.map((player, index) => (
              <div key={index} className="bg-[#1e293b] p-3 rounded-lg mb-2">
                <p className="text-green-300">{player}</p>
              </div>
            ))}
          </div>
          
          {playersList.length >= 2 && (
            <div className="mt-6">
              <button 
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Start Game
              </button>
            </div>
          )}
          
          <button 
            onClick={leaveLobby}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-8"
          >
            Leave Lobby
          </button>
        </>
      )}
    </div>
  );
}