import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Activity,
  Calendar,
  Menu,
  X,
  Heart,
  Home,
  Stethoscope,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path === "/") return "Home";
    return path
      .slice(1)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Activity, label: "Health Tracking", path: "/health-tracking" },
    { icon: Stethoscope, label: "Find Doctors", path: "/appointment" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Heart, label: "Wellness Tips", path: "/wellness" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-bold text-primary">LiverCare</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-200 ease-in-out min-h-screen",
          sidebarOpen ? "lg:ml-64" : "ml-0"
        )}
      >
        <header className="bg-white border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className={cn("lg:hidden", sidebarOpen && "hidden")}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
