
import { toast } from "sonner";
import { getAuthHeaders, handleApiError, API_URL, ApiResponse } from "./apiUtils";

// Type definitions
export interface Parking {
  id: string;
  maxSlots: number;
  slotCategory: string;
  pricePerHour: number;
}

export interface ParkingSlot {
  id: string;
  parkingId: string;
  parkingSlotNumber: string;
  parkingSlotSize: string;
  parkingSlotStatus: string;
  parking?: Parking;
}

export interface ParkingSlotListResponse extends ApiResponse<ParkingSlot[]> {
  total: number;
  page: number;
  limit: number;
}

export interface ParkingSlotResponse extends ApiResponse<ParkingSlot> {}

export interface CreateParkingSlotRequest {
  parkingId: string;
  parkingSlotSize: "SMALL" | "STANDARD" | "LARGE";
}

export interface UpdateParkingSlotRequest {
  parkingId?: string;
  parkingSlotSize?: "SMALL" | "STANDARD" | "LARGE";
  parkingSlotStatus?: "AVAILABLE" | "OCCUPIED";
}

export interface CreateMultipleParkingSlotsRequest {
  parkingId: string;
  numberOfParkingSlots: number;
  parkingSlotSize: "SMALL" | "STANDARD" | "LARGE";
}

// ParkingSlots API service
class ParkingSlotApiService {
  async getParkingSlots(params: {
    page?: number;
    limit?: number;
    search?: string;
    parkingSlotSize?: string;
    parkingSlotStatus?: string;
    parkingId?: string;
  } = {}): Promise<ParkingSlotListResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.parkingSlotSize) queryParams.append('parkingSlotSize', params.parkingSlotSize);
      if (params.parkingSlotStatus) queryParams.append('parkingSlotStatus', params.parkingSlotStatus);
      if (params.parkingId) queryParams.append('parkingId', params.parkingId);
      
      const url = `${API_URL}/parkingSlots/?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch parking slots');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getParkingSlotById(id: string): Promise<ParkingSlotResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlots/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to fetch parking slot');
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async createParkingSlot(slotData: CreateParkingSlotRequest): Promise<ParkingSlotResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlots/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(slotData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to create parking slot');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot created successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateParkingSlot(id: string, slotData: UpdateParkingSlotRequest): Promise<ParkingSlotResponse> {
    try {
      const response = await fetch(`${API_URL}/parkingSlots/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(slotData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to update parking slot');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot updated successfully');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteParkingSlot(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/parkingSlots/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to delete parking slot');
        throw new Error(data.message);
      }
      
      toast.success('Parking slot deleted successfully');
    } catch (error) {
      handleApiError(error);
    }
  }

  async createMultipleParkingSlots(slotsData: CreateMultipleParkingSlotsRequest): Promise<ApiResponse<{count: number}>> {
    try {
      const response = await fetch(`${API_URL}/parkingSlots/many`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(slotsData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'Failed to create parking slots');
        throw new Error(data.message);
      }
      
      toast.success(`${data.data.count} parking slots created successfully`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export const parkingSlotApi = new ParkingSlotApiService();
