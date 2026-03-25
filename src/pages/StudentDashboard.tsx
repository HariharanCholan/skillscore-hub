import { useEffect, useState } from "react";
import { calculateScore } from "@/lib/scoring";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/DashboardLayout";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Trophy, Target } from "lucide-react";

/* =========================
   TYPES
========================= */

type Student = {
  name: string;
  registerNumber: string;
  department: string;
  internalMarks: number;
  attendance: number;
  skills: Record<string, number>;
  problemSolving: {
    problemsSolved: number;
    contestParticipation: number;
    rating: number;
  };
  achievements: string[];
};

type BackendUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  score: number;
};

/* =========================
   COMPONENT
========================= */

const StudentDashboard = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const users = data as BackendUser[];

        const current = users.find((u) => u.email === user.email);

        if (current) {
          setStudent({
            name: current.name,
            registerNumber: "N/A",
            department: "N/A",

            // ✅ Required for scoring
            internalMarks: 75,
            attendance: 85,

            skills: {
              coding: 70,
              communication: 80,
            },

            problemSolving: {
              problemsSolved: 50,
              contestParticipation: 5,
              rating: 1200,
            },

            achievements: [],
          });
        }
      })
      .catch((err) => console.error(err));
  }, [user]);

  /* =========================
     LOADING
  ========================= */
  if (!student) {
    return <div className="p-6">Loading...</div>;
  }

  /* =========================
     SCORE
  ========================= */
  const score = calculateScore(student);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {student.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            {student.registerNumber} · {student.department}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SCORE */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ScoreDisplay score={score} />
            </CardContent>
          </Card>

          {/* DETAILS */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* ACADEMICS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Academics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Marks: {student.internalMarks}</p>
                <p>Attendance: {student.attendance}%</p>
              </CardContent>
            </Card>

            {/* SKILLS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(student.skills).map(([k, v]) => (
                  <p key={k}>
                    {k}: {v}%
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* PROBLEM SOLVING */}
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  Problem Solving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Solved: {student.problemSolving.problemsSolved}</p>
                <p>Contests: {student.problemSolving.contestParticipation}</p>
                <p>Rating: {student.problemSolving.rating}</p>
              </CardContent>
            </Card>

            {/* ACHIEVEMENTS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.achievements.length > 0 ? (
                  student.achievements.map((a, i) => (
                    <Badge key={i}>{a}</Badge>
                  ))
                ) : (
                  <p>No achievements</p>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;