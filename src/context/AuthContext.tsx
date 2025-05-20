
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "sonner";

interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string, email: string) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('token');
    
    if (token) {
      // For now we'll just set a dummy user since we don't have an endpoint to fetch user data
      // In a real app, you would fetch the user profile here
      setUser({ 
        email: localStorage.getItem('userEmail') || 'user@example.com',
        firstName: localStorage.getItem('userFirstName') || 'User', 
        lastName: localStorage.getItem('userLastName') || '' 
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.login({ email, password });
      // For demonstration purposes - in a real app you would fetch user profile here
      setUser({ 
        email,
        firstName: 'User',
        lastName: ''
      });
      
      // Store email to persist basic user info
      localStorage.setItem('userEmail', email);
      
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.register({ firstName, lastName, email, password });
      toast.success("Registered successfully! Please verify your email.");
      
      // Store basic user info
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
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
    setUser(null);
    toast.success("Logged out successfully");
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await api.sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Send password reset email error:", error);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await api.resetPassword(token, password);
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  const verifyEmail = async (token: string, email: string) => {
    try {
      await api.verifyEmail(token, email);
    } catch (error) {
      console.error("Verify email error:", error);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      await api.sendVerificationEmail(email);
    } catch (error) {
      console.error("Send verification email error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        sendPasswordResetEmail,
        resetPassword,
        verifyEmail,
        sendVerificationEmail,
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
