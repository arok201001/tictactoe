type SquareProps = {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
};

export default function Square({ value, onClick, isWinningSquare }: SquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={value !== null}
      className={`
        h-24 w-24 rounded-xl text-5xl font-bold flex items-center justify-center transition-all duration-200
        ${isWinningSquare 
          ? "border-2 border-yellow-400 bg-[#3f2e18] text-[#00cedd] shadow-[0_0_15px_rgba(250,204,21,0.6)]" 
          : "bg-[#1a2333] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),_inset_-4px_-4px_8px_rgba(255,255,255,0.05)] hover:bg-[#1f2b3e]"
        }
      `}
    >
      {value === "X" && (
        <span className={`text-[#00cedd] drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] ${isWinningSquare ? "text-[#00cedd]" : ""}`}>
          X
        </span>
      )}
      {value === "O" && (
        <span className="text-[#f472b6] drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]">
          O
        </span>
      )}
    </button>
  );
}