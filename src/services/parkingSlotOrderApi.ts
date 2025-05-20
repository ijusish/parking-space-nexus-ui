
import { toast } from "sonner";
import { getAuthHeaders, handleApiError, API_URL, ApiResponse } from "./apiUtils";

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

export interface ParkingSlotOrderListResponse extends ApiResponse<ParkingSlotOrder[]> {
  total: number;
  page: number;
  limit: number;
}

export interface ParkingSlotOrderResponse extends ApiResponse<ParkingSlotOrder> {}

export interface CreateParkingSlotOrderRequest {
  parkingSlotId: string;
  vehiclePlateNumber: string;
}

export type ParkingSlotOrderStatus = "PENDING" | "COMPLETED";

export interface UpdateParkingSlotOrderStatusRequest {
  status: ParkingSlotOrderStatus;
}

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

  async updateParkingSlotOrderStatus(id: string, statusData: UpdateParkingSlotOrderStatusRequest): Promise<ParkingSlotOrderResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlot-orders/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(statusData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to update parking slot order status');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot order status updated successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getParkingSlotOrdersByParkingSlotId(
    parkingSlotId: string, 
    page = 1, 
    limit = 10
  ): Promise<ParkingSlotOrderListResponse> {
    try {
      const url = `${API_URL}/parkingSlot-orders/parkingSlot/${parkingSlotId}?page=${page}&limit=${limit}`;
      
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

  async getParkingSlotOrdersByUserId(
    userId: string, 
    page = 1, 
    limit = 10
  ): Promise<ParkingSlotOrderListResponse> {
    try {
      const url = `${API_URL}/parkingSlot-orders/user/${userId}?page=${page}&limit=${limit}`;
      
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
