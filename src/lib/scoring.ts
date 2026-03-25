import { StudentData, ScoreResult } from "./types";

export function calculateScore(student: StudentData): ScoreResult {
  // Marks (30%) — average of internal marks and attendance, normalized to 100
  const marksScore = ((student.internalMarks + student.attendance) / 2);

  // Skills (20%) — average of three skills
  const { communication, aptitude, technical } = student.skills;
  const skillsScore = (communication + aptitude + technical) / 3;

  // Problem solving (30%) — weighted combination
  const ps = student.problemSolving;
  const solvedNorm = Math.min(ps.problemsSolved / 200, 1) * 100;
  const contestNorm = Math.min(ps.contestParticipation / 15, 1) * 100;
  const ratingNorm = Math.min(ps.rating / 2000, 1) * 100;
  const problemSolvingScore = solvedNorm * 0.4 + contestNorm * 0.3 + ratingNorm * 0.3;

  // Activities (20%) — based on achievements count
  const activitiesScore = Math.min(student.achievements.length / 3, 1) * 100;

  const total = Math.round(
    marksScore * 0.3 + skillsScore * 0.2 + problemSolvingScore * 0.3 + activitiesScore * 0.2
  );

  const status = total >= 75 ? "green" : total >= 50 ? "yellow" : "red";

  return {
    total,
    marksScore: Math.round(marksScore),
    skillsScore: Math.round(skillsScore),
    problemSolvingScore: Math.round(problemSolvingScore),
    activitiesScore: Math.round(activitiesScore),
    status,
  };
}
