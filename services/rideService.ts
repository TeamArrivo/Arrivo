// src/services/riderService.ts
import api from '@/app/api/api';

export interface RiderDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  rating:number;
  // Add other fields as needed
}

export interface RiderUpdateDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export const getRiderById = async (id: number): Promise<RiderDto> => {
  const response = await api.get(`/riders/${id}`);
  return response.data;
};

export const getAllRiders = async (): Promise<RiderDto[]> => {
  const response = await api.get('/riders');
  return response.data;
};

export const updateRider = async (
  id: number,
  dto: RiderUpdateDto
): Promise<RiderDto> => {
  const response = await api.put(`/riders/${id}`, dto);
  return response.data;
};

export const deleteRider = async (id: number): Promise<void> => {
  await api.delete(`/riders/${id}`);
};
