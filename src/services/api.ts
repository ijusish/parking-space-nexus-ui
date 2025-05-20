
import { toast } from "sonner";

const API_URL = 'http://localhost:8000/api/v1';

// Type definitions based on API spec
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}

export interface AuthResponse {
  token: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Helper function to handle API errors
const handleApiError = (error: any): never => {
  const message = error?.response?.data?.message || 'An unexpected error occurred';
  toast.error(message);
  throw error;
};

// Function to get auth headers for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// API service class
class ApiService {
  // Auth endpoints
  async login(credentials: LoginRequest): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data: ApiResponse<AuthResponse> = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Login failed');
        throw new Error(data.message);
      }
      
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        return data.data.token;
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      return handleApiError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<UserData> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data: ApiResponse<UserData> = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Registration failed');
        throw new Error(data.message);
      }
      
      if (data.data) {
        return data.data;
      } else {
        throw new Error('No user data received');
      }
    } catch (error) {
      return handleApiError(error);
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/send-reset-password-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to send reset email');
        throw new Error(data.message);
      }
      
      toast.success('Password reset email sent');
    } catch (error) {
      handleApiError(error);
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to reset password');
        throw new Error(data.message);
      }
      
      toast.success('Password reset successfully');
    } catch (error) {
      handleApiError(error);
    }
  }
  
  async verifyEmail(token: string, email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to verify email');
        throw new Error(data.message);
      }
      
      toast.success('Email verified successfully');
    } catch (error) {
      handleApiError(error);
    }
  }

  async sendVerificationEmail(email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/send-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to send verification email');
        throw new Error(data.message);
      }
      
      toast.success('Verification email sent');
    } catch (error) {
      handleApiError(error);
    }
  }

  // Additional endpoints for other API paths will be added here
  // as we implement more features
}

export const api = new ApiService();
