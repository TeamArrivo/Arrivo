// src/services/driverService.ts
import api from '@/app/api/api';

export interface DriverProfileDto {
  id: number;
  name: string;
  rating?: number;
  licenseNumber?: string;
  vehicleType?: string;
  // Add more fields based on your actual DTO
}

export interface  DriverDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  rating:number;
  // Add other fields as needed
}


// GET /api/drivers/{id}/profile
export const getDriverProfile = async (id: number): Promise<DriverProfileDto> => {
  const response = await api.get(`/drivers/${id}/profile`);
  return response.data;
};
export const getDriverById = async (id: number): Promise<DriverDto> => {
  const response = await api.get(`/drivers/${id}`);
  return response.data;
};

export const deleteDriver = async (id: number): Promise<void> => {
  await api.delete(`/drivers/${id}`);
};

