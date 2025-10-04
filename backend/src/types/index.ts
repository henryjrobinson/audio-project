import { Request } from 'express';

// Extend Express Request to include user info
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// DTOs (Data Transfer Objects)
export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateProjectDto {
  subjectName: string;
  subjectAge?: number;
  subjectPhoto?: string;
  diagnosis?: string;
  diagnosisDate?: string;
}

export interface UpdateProjectDto {
  subjectName?: string;
  subjectAge?: number;
  subjectPhoto?: string;
  diagnosis?: string;
  diagnosisDate?: string;
  status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
}

export interface InviteMemberDto {
  email: string;
  name: string;
  relationship: string;
  personalMessage?: string;
}

export interface ScheduleConversationDto {
  scheduledAt: string;
  topic: string;
  duration: number;
  suggestedTopics: string[];
  specialNotes?: string;
}

export interface UpdateStoryDto {
  title?: string;
  excerpt?: string;
  fullContent?: string;
  tags?: string[];
}