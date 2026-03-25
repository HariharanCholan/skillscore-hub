import { useState } from "react";
import { StudentData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface StudentFormProps {
  student: StudentData;
  onSave: (updated: StudentData) => void;
}

const StudentForm = ({ student, onSave }: StudentFormProps) => {
  const [data, setData] = useState<StudentData>({ ...student });

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        Edit: {data.name} <span className="text-muted-foreground text-sm font-normal">({data.registerNumber})</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Academics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Internal Marks (0-100)</Label>
              <Input
                type="number" min={0} max={100}
                value={data.internalMarks}
                onChange={(e) => setData({ ...data, internalMarks: Math.min(100, Math.max(0, Number(e.target.value))) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Attendance % (0-100)</Label>
              <Input
                type="number" min={0} max={100}
                value={data.attendance}
                onChange={(e) => setData({ ...data, attendance: Math.min(100, Math.max(0, Number(e.target.value))) })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Skills (0-100)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Communication</Label>
              <Input
                type="number" min={0} max={100}
                value={data.skills.communication}
                onChange={(e) => setData({ ...data, skills: { ...data.skills, communication: Math.min(100, Math.max(0, Number(e.target.value))) } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Aptitude</Label>
              <Input
                type="number" min={0} max={100}
                value={data.skills.aptitude}
                onChange={(e) => setData({ ...data, skills: { ...data.skills, aptitude: Math.min(100, Math.max(0, Number(e.target.value))) } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Technical</Label>
              <Input
                type="number" min={0} max={100}
                value={data.skills.technical}
                onChange={(e) => setData({ ...data, skills: { ...data.skills, technical: Math.min(100, Math.max(0, Number(e.target.value))) } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Problem Solving</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Problems Solved</Label>
              <Input
                type="number" min={0}
                value={data.problemSolving.problemsSolved}
                onChange={(e) => setData({ ...data, problemSolving: { ...data.problemSolving, problemsSolved: Math.max(0, Number(e.target.value)) } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Contest Participation</Label>
              <Input
                type="number" min={0}
                value={data.problemSolving.contestParticipation}
                onChange={(e) => setData({ ...data, problemSolving: { ...data.problemSolving, contestParticipation: Math.max(0, Number(e.target.value)) } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <Input
                type="number" min={0}
                value={data.problemSolving.rating}
                onChange={(e) => setData({ ...data, problemSolving: { ...data.problemSolving, rating: Math.max(0, Number(e.target.value)) } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Achievements (one per line)</Label>
              <Textarea
                rows={4}
                value={data.achievements.join("\n")}
                onChange={(e) => setData({ ...data, achievements: e.target.value.split("\n").filter((a) => a.trim()) })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSave} size="lg">Save Changes</Button>
    </div>
  );
};

export default StudentForm;
