import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Home,
  Settings,
  Users,
  Car,
  CalendarClock,
  Map,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  const routes = useMemo(
    () => [
      {
        label: "Dashboard",
        icon: Home,
        href: "/dashboard",
        color: "text-parking-primary",
      },
      {
        label: "Users",
        icon: Users,
        href: "/users",
        color: "text-parking-primary",
      },
      {
        label: "Parking Orders",
        icon: CalendarClock,
        href: "/parking-orders",
        color: "text-parking-primary",
      },
      // {
      //   label: "Parking Slots",
      //   icon: Map,
      //   href: "/parking-slots",
      //   color: "text-parking-primary",
      // },
      // {
      //   label: "Vehicles",
      //   icon: Car,
      //   href: "/vehicles",
      //   color: "text-parking-primary",
      // },
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-parking-primary",
      },
    ],
    []
  );

  if (isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r border-parking-border bg-parking-background w-60 fixed h-full z-20",
        className
      )}
      {...props}
    >
      <div className="p-4 flex-shrink-0">
        <Link to="/">
          <Button variant="ghost" className="h-auto w-auto p-0">
            Parking System
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1 space-y-2">
        <ul className="pt-6 pb-2">
          {routes.map((route) => (
            <li key={route.href} className="text-sm">
              <Link to={route.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal",
                    location.pathname === route.href
                      ? "bg-parking-secondary/10 text-parking-primary"
                      : "text-muted-foreground",
                    "hover:text-parking-primary hover:bg-parking-secondary/10"
                  )}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className="p-4 flex-shrink-0">
        <Button
          onClick={() => {
            logout();
          }}
          variant="ghost"
          className="w-full justify-start font-normal hover:text-parking-primary hover:bg-parking-secondary/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
