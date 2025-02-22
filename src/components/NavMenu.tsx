import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  UserCircle,
  Map,
  Calendar,
  BarChart,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "Profile", icon: <UserCircle size={20} />, path: "/profile" },
    { title: "Find Doctors", icon: <Map size={20} />, path: "/map" },
    { title: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
    {
      title: "Health Stats",
      icon: <BarChart size={20} />,
      path: "/statistics",
    },
    { title: "Dashboard", icon: <Home size={20} />, path: "/appointment" },
    {
      title: "Submit Appointment",
      icon: <Calendar size={20} />,
      path: "/appointment/submit",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <nav className="border-b bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={cn(
                    "h-16 px-4 rounded-none transition-colors gap-2",
                    location.pathname === item.path &&
                      "bg-primary/10 text-primary"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.title}
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="icon">
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavMenu;
