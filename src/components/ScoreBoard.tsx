import { Sparkles } from "lucide-react";

type ScoreBoardProps = {
  scores: { X: number; O: number; Ties: number };
  xIsNext: boolean;
};

export default function ScoreBoard({ scores, xIsNext }: ScoreBoardProps) {

  const boxClass = "flex flex-col items-center justify-center rounded-xl p-3 w-24 h-24 shadow-lg transition-colors duration-300";
  const activeClassX = "bg-[#0f3b5e] border-b-4 border-[#00cedd]"; 
  const activeClassO = "bg-[#3a1e35] border-b-4 border-[#f472b6]";
  const inactiveClass = "bg-[#1e293b] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] opacity-70";

  return (
    <div className="flex gap-4 justify-between items-center mb-8 w-full max-w-[320px]">

      <div className={`${boxClass} ${xIsNext ? activeClassX : inactiveClass}`}>
        <span className="text-[10px] text-[#8d9db5] font-bold uppercase mb-1">Player</span>
        <span className="text-[#00cedd] text-3xl font-bold">X</span>
        <span className="text-white text-xl font-medium mt-1">{scores.X}</span>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#1e293b] rounded-xl px-3 py-4 w-16 h-20 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)]">
         <Sparkles className="w-4 h-4 text-yellow-500 mb-1" />
         <span className="text-[9px] text-[#8d9db5] font-bold uppercase">Ties</span>
         <span className="text-white text-lg font-medium">{scores.Ties}</span>
      </div>

      
      <div className={`${boxClass} ${!xIsNext ? activeClassO : inactiveClass}`}>
        <span className="text-[10px] text-[#8d9db5] font-bold uppercase mb-1">Player</span>
        <span className="text-[#f472b6] text-3xl font-bold">O</span>
        <span className="text-white text-xl font-medium mt-1">{scores.O}</span>
      </div>
    </div>
  );
}