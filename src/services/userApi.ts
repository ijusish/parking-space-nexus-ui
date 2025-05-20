
import { toast } from "sonner";

const API_URL = 'http://localhost:8000/api/v1';

// Type definitions
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserListResponse {
  status: string;
  message: string;
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserResponse {
  status: string;
  message: string;
  data: User;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
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

// User API service
class UserApiService {
  async getUsers(page = 1, limit = 10, search?: string): Promise<UserListResponse> {
    try {
      let url = `${API_URL}/user/?page=${page}&limit=${limit}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch users');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch user');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_URL}/user/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to create user');
        throw new Error(data.message);
      }
      
      toast.success('User created successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to update user');
        throw new Error(data.message);
      }
      
      toast.success('User updated successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to delete user');
        throw new Error(data.message);
      }
      
      toast.success('User deleted successfully');
    } catch (error) {
      handleApiError(error);
    }
  }
}

export const userApi = new UserApiService();
