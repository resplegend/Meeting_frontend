export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  message?: string; 
}

export interface Meeting {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  attendees: string[];
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMeetingData {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  attendees: string[];
}

export interface UpdateMeetingData {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  location?: string;
  attendees?: string[];
} 