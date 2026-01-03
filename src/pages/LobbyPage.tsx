import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import players from "../assets/players-icon.png";

export default function Lobby() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90 min-w-90">
      <h1 className="text-white text-3xl mt-3 ">WELCOME BACK</h1>
      <h3 className="text-[#8d9db5] mt-2 text-sm">
        Waiting for players to join...
      </h3>
      <h2 className="text-[#8d9db5] text-sm mt-10 mb-3">ROOM CODE</h2>
      <div
        id="room-code"
        className="bg-red-50 h-30 w-80 rounded-xl bg-linear-to-r from-[#2f2054] to-[#412345] mb-7"
      ></div>
      <div id="lobby-players" className="flex mr-auto items-center">
        <div className="flex gap-1">
          <img src={players} alt="" className="h-8" />
          <p className="p-1 text-[#8d9db5]">PLAYERS</p>
        </div>
      </div>
      <div id="buttons-lobby" className="flex flex-col">
        <NavLink to={"/dashboard"}>
          <Button style={{ marginBottom: "0px" }}>➤ Start Game</Button>
        </NavLink>
        <Button style={{ backgroundColor: "#29374d" }}>⎋ Leave Lobby</Button>
      </div>
    </div>
  );
}
