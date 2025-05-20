
import { toast } from "sonner";

export const API_URL = 'http://localhost:8000/api/v1';

// Helper function to handle API errors
export const handleApiError = (error: any): never => {
  const message = error?.response?.data?.message || 'An unexpected error occurred';
  toast.error(message);
  throw error;
};

// Function to get auth headers for authenticated requests
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Common response types
export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}
