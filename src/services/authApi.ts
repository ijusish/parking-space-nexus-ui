
import { toast } from "sonner";
import { API_URL, handleApiError, ApiResponse } from "./apiUtils";

// Auth specific types
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

export interface AuthResponse {
  token: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Auth API service
class AuthApiService {
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
}

export const authApi = new AuthApiService();
