import axios from 'axios';
import Cookies from 'js-cookie';
import type { Meeting, CreateMeetingData, UpdateMeetingData, LoginCredentials, LoginResponse } from './types';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const meetingsAPI = {
  getAll: async (): Promise<Meeting[]> => {
    const response = await api.get('/meetings');
    return response.data;
  },
  
  getById: async (id: number): Promise<Meeting> => {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
  },
  
  create: async (data: CreateMeetingData): Promise<Meeting> => {
    const response = await api.post('/meetings', data);
    return response.data;
  },
  
  update: async (id: number, data: UpdateMeetingData): Promise<Meeting> => {
    const response = await api.patch(`/meetings/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/meetings/${id}`);
  },
};

export default api; 