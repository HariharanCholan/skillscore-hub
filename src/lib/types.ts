export type Role = "student" | "staff";

export interface User {
  name: string;
  email: string;
  role: Role;
  registerNumber?: string;
  department?: string;
}

export interface ProblemSolving {
  problemsSolved: number;
  contestParticipation: number;
  rating: number;
}

export interface Skills {
  communication: number;
  aptitude: number;
  technical: number;
}

export interface StudentData {
  id: string;
  name: string;
  registerNumber: string;
  department: string;
  internalMarks: number;
  attendance: number;
  skills: Skills;
  problemSolving: ProblemSolving;
  achievements: string[];
}

export interface ScoreResult {
  total: number;
  marksScore: number;
  skillsScore: number;
  problemSolvingScore: number;
  activitiesScore: number;
  status: "green" | "yellow" | "red";
}
