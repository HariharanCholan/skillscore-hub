import { useState } from "react";
import { dummyStudents } from "@/lib/data";
import { StudentData } from "@/lib/types";
import { calculateScore } from "@/lib/scoring";
import DashboardLayout from "@/components/DashboardLayout";
import StudentForm from "@/components/StudentForm";
import StudentDetailView from "@/components/StudentDetailView";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, AlertTriangle, CheckCircle, Pencil } from "lucide-react";
import { toast } from "sonner";

type View = "list" | "detail" | "edit";

const StaffDashboard = () => {
  const [students, setStudents] = useState<StudentData[]>(dummyStudents);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");

  const scores = students.map((s) => ({ student: s, score: calculateScore(s) }));
  const avgScore = Math.round(scores.reduce((sum, s) => sum + s.score.total, 0) / scores.length);
  const readyCount = scores.filter((s) => s.score.status === "green").length;
  const atRiskCount = scores.filter((s) => s.score.status === "red").length;

  const handleSave = (updated: StudentData) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setView("detail");
    toast.success("Student data updated successfully");
  };

  const goBack = () => {
    setSelectedStudent(null);
    setView("list");
  };

  const student = selectedStudent ? students.find((s) => s.id === selectedStudent) : null;

  if (view === "edit" && student) {
    return (
      <DashboardLayout>
        <Button variant="ghost" onClick={() => setView("detail")} className="mb-4">
          ← Back to Details
        </Button>
        <StudentForm student={student} onSave={handleSave} />
      </DashboardLayout>
    );
  }

  if (view === "detail" && student) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={goBack} className="mb-2">
                ← Back to Students
              </Button>
              <h2 className="text-xl font-semibold text-foreground">{student.name}</h2>
              <p className="text-sm text-muted-foreground">{student.registerNumber} · {student.department}</p>
            </div>
            <Button onClick={() => setView("edit")} className="gap-2">
              <Pencil className="w-4 h-4" /> Edit Data
            </Button>
          </div>
          <StudentDetailView student={student} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage student readiness data</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{students.length}</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{avgScore}</p>
                  <p className="text-xs text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-score-green/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-score-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{readyCount}</p>
                  <p className="text-xs text-muted-foreground">Employment Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-score-red/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-score-red" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{atRiskCount}</p>
                  <p className="text-xs text-muted-foreground">At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scores.map(({ student, score }) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => { setSelectedStudent(student.id); setView("detail"); }}
                >
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {student.registerNumber} · {student.department}
                    </p>
                  </div>
                  <ScoreDisplay score={score} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
