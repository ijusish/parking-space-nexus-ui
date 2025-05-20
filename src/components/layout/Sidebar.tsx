
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LucideIcon,
  LayoutDashboard,
  Users,
  CalendarClock,
  CarFront,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  adminOnly?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, adminOnly = false }) => {
  const { isAdmin } = useAuth();
  
  // Don't render admin-only items for non-admin users
  if (adminOnly && !isAdmin) {
    return null;
  }
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center py-2 px-4 gap-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
          isActive && "bg-gray-100 text-parking-primary font-medium"
        )
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { isMobile } = useMobile();
  
  return (
    <aside className={`w-64 border-r flex-shrink-0 bg-white h-full overflow-y-auto ${
      isMobile ? "hidden" : "block"
    }`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-parking-accent mb-6 px-4">Navigation</h2>
        <nav className="space-y-1">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/users" icon={Users} label="User Management" adminOnly={true} />
          <NavItem to="/parking-orders" icon={CalendarClock} label="Parking Orders" />
          <NavItem to="/vehicles" icon={CarFront} label="Vehicles" />
          <NavItem to="/parking-slots" icon={MapPin} label="Parking Slots" />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
