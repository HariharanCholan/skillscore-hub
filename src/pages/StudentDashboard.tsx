import { useState } from "react";
import { dummyStudents } from "@/lib/data";
import { calculateScore } from "@/lib/scoring";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/DashboardLayout";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Trophy, Target } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  // For demo, use first student's data
  const [student] = useState(dummyStudents[0]);
  const score = calculateScore(student);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name || student.name}</h1>
          <p className="text-muted-foreground text-sm">{student.registerNumber} · {student.department}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Employment Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ScoreDisplay score={score} />
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Academics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Internal Marks</span>
                  <span className="font-semibold text-foreground">{student.internalMarks}/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: `${student.internalMarks}%` }} />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Attendance</span>
                  <span className="font-semibold text-foreground">{student.attendance}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: `${student.attendance}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(student.skills).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      <span className="text-sm font-semibold text-foreground">{value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> Problem Solving
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Problems Solved</span>
                  <span className="font-semibold text-foreground">{student.problemSolving.problemsSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Contests</span>
                  <span className="font-semibold text-foreground">{student.problemSolving.contestParticipation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="font-semibold font-mono text-foreground">{student.problemSolving.rating}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.achievements.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {student.achievements.map((a, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No achievements recorded</p>
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
