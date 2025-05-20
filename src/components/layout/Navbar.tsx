
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, UserPlus } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="flex items-center">
            <div className="rounded-md bg-parking-primary p-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="m21 15-3-3 3-3" />
                <path d="m3 15 3-3-3-3" />
              </svg>
            </div>
            <span className="text-xl font-bold text-parking-accent">ParkWise</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="text-sm text-gray-700 hidden md:block">
                Welcome, <span className="font-semibold">{user?.firstName || 'User'}</span>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="text-parking-accent hover:text-parking-primary hover:bg-gray-100"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hidden md:flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-parking-primary hover:bg-parking-secondary">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Sign Up</span>
                  <span className="md:hidden">Join</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
