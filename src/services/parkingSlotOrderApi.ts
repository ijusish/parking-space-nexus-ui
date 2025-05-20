
import { toast } from "sonner";

const API_URL = 'http://localhost:8000/api/v1';

// Type definitions
export interface ParkingSlot {
  id: string;
  parkingSlotNumber: string;
  parkingSlotSize: string;
  parking: {
    id: string;
    maxSlots: number;
    slotCategory: string;
    pricePerHour: number;
  };
}

export interface ParkingSlotVehicle {
  id: string;
  vehiclePlateNumber: string;
}

export interface ParkingSlotOrder {
  id: string;
  parkingSlotCustomerId: string;
  parkingSlotId: string;
  vehicleId: string;
  pricePerHour: number;
  hours: number;
  parkingSlotOrderStatus: string;
  parkingSlot?: ParkingSlot;
  parkingSlotVehicle?: ParkingSlotVehicle;
}

export interface ParkingSlotOrderListResponse {
  status: string;
  message: string;
  data: ParkingSlotOrder[];
  total: number;
  page: number;
  limit: number;
}

export interface ParkingSlotOrderResponse {
  status: string;
  message: string;
  data: ParkingSlotOrder;
}

export interface CreateParkingSlotOrderRequest {
  parkingSlotId: string;
  vehiclePlateNumber: string;
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

// ParkingSlot Orders API service
class ParkingSlotOrderApiService {
  async getParkingSlotOrders(page = 1, limit = 10): Promise<ParkingSlotOrderListResponse> {
    try {
      const url = `${API_URL}/parkingSlot-orders/?page=${page}&limit=${limit}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch parking slot orders');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getParkingSlotOrderById(id: string): Promise<ParkingSlotOrderResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlot-orders/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch parking slot order');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async createParkingSlotOrder(orderData: CreateParkingSlotOrderRequest): Promise<ParkingSlotOrderResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlot-orders/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to create parking slot order');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot order created successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteParkingSlotOrder(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/parkingSlot-orders/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to delete parking slot order');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot order deleted successfully');
    } catch (error) {
      handleApiError(error);
    }
  }
}

export const parkingSlotOrderApi = new ParkingSlotOrderApiService();
