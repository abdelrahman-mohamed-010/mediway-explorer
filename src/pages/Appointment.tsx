import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  UserCircle,
  Map,
  Calendar,
  BarChart,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Appointment = () => {
  const navigate = useNavigate();

  const widgets = [
    { title: "Profile", icon: <UserCircle size={24} />, path: "/profile" },
    { title: "Find Doctors", icon: <Map size={24} />, path: "/map" },
    { title: "Calendar", icon: <Calendar size={24} />, path: "/calendar" },
    {
      title: "Health Stats",
      icon: <BarChart size={24} />,
      path: "/statistics",
    },
    { title: "Dashboard", icon: <Home size={24} />, path: "/appointment" },
    { 
      title: "Submit Appointment", 
      icon: <Calendar size={24} />, 
      path: "/appointment/submit" 
    },
  ];

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to MediWay
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <Button
                key={widget.title}
                variant="outline"
                className="h-32 flex flex-col items-center justify-center gap-2 
                         hover:bg-primary/5 hover:border-primary/20 transition-colors
                         hover:text-primary"
                onClick={() => navigate(widget.path)}
              >
                {widget.icon}
                <span className="text-lg">{widget.title}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointment;
