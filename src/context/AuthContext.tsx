
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../services/authApi";
import { toast } from "sonner";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string, email: string) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('token');
    
    if (token) {
      // For now we'll just set a dummy user since we don't have an endpoint to fetch user data
      // In a real app, you would fetch the user profile here
      const userRole = localStorage.getItem('userRole') || 'user';
      setUser({ 
        email: localStorage.getItem('userEmail') || 'user@example.com',
        firstName: localStorage.getItem('userFirstName') || 'User', 
        lastName: localStorage.getItem('userLastName') || '',
        role: userRole
      });
      setIsAdmin(userRole === 'admin');
    } else {
      // Redirect to login if we're on a protected route and no token is found
      const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/verify-email'];
      const resetPasswordRoute = /^\/reset-password\/[A-Za-z0-9-_]+$/;
      
      const isPublicRoute = publicRoutes.includes(location.pathname) || resetPasswordRoute.test(location.pathname);
      
      if (!isPublicRoute) {
        navigate('/login', { state: { from: location.pathname } });
      }
    }
    
    setIsLoading(false);
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authApi.login({ email, password });
      
      // For demonstration purposes - in a real app you would fetch user profile here
      // We'll simulate an admin user if the email contains 'admin'
      const isAdminUser = email.includes('admin');
      const role = isAdminUser ? 'admin' : 'user';
      
      setUser({ 
        email,
        firstName: 'User',
        lastName: '',
        role
      });
      
      // Store user info to persist basic user info
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      setIsAdmin(isAdminUser);
      
      toast.success("Logged in successfully");
      
      // Redirect to dashboard or the originally requested page
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authApi.register({ firstName, lastName, email, password });
      toast.success("Registered successfully! Please verify your email.");
      
      // Store basic user info
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
      localStorage.setItem('userRole', 'user'); // New users are regular users by default
      
      // Redirect to verify email page
      navigate('/verify-email', { state: { email } });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
        sendPasswordResetEmail: authApi.sendPasswordResetEmail,
        resetPassword: authApi.resetPassword,
        verifyEmail: authApi.verifyEmail,
        sendVerificationEmail: authApi.sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
