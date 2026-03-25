import { ScoreResult } from "@/lib/types";

interface ScoreDisplayProps {
  score: ScoreResult;
  size?: "sm" | "lg";
}

const ScoreDisplay = ({ score, size = "lg" }: ScoreDisplayProps) => {
  const colorClass =
    score.status === "green"
      ? "score-green"
      : score.status === "yellow"
      ? "score-yellow"
      : "score-red";

  const bgClass =
    score.status === "green"
      ? "bg-score-green/10"
      : score.status === "yellow"
      ? "bg-score-yellow/10"
      : "bg-score-red/10";

  const ringClass =
    score.status === "green"
      ? "border-score-green"
      : score.status === "yellow"
      ? "border-score-yellow"
      : "border-score-red";

  const label =
    score.status === "green"
      ? "Employment Ready"
      : score.status === "yellow"
      ? "Needs Improvement"
      : "At Risk";

  if (size === "sm") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgClass}`}>
        <span className={`text-sm font-bold ${colorClass}`}>{score.total}</span>
        <span className={`text-xs font-medium ${colorClass}`}>{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-28 h-28 rounded-full border-4 ${ringClass} ${bgClass} flex items-center justify-center`}>
        <span className={`text-3xl font-bold font-mono ${colorClass}`}>{score.total}</span>
      </div>
      <span className={`text-sm font-semibold ${colorClass}`}>{label}</span>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground mt-1">
        <span>Marks: <strong className="text-foreground">{score.marksScore}%</strong></span>
        <span>Skills: <strong className="text-foreground">{score.skillsScore}%</strong></span>
        <span>Problem Solving: <strong className="text-foreground">{score.problemSolvingScore}%</strong></span>
        <span>Activities: <strong className="text-foreground">{score.activitiesScore}%</strong></span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
