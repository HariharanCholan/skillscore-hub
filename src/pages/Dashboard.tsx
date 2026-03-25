import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import StaffDashboard from "./StaffDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "staff" ? <StaffDashboard /> : <StudentDashboard />;
};

export default Dashboard;
