import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import StaffDashboard from "./StaffDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  // 🔒 If not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🎯 Role-based rendering
  if (user.role === "staff") {
    return <StaffDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;