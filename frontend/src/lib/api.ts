import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  ApiResponse,
  AuthResponse,
  User,
  LegacyProject,
  ProjectStats,
  RegisterDto,
  LoginDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse>) => {
        if (error.response?.status === 401) {
          // Clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/register', data);
    if (response.data.success && response.data.data) {
      this.setTokens(response.data.data.accessToken, response.data.data.refreshToken);
      return response.data.data;
    }
    throw new Error('Registration failed');
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/login', data);
    if (response.data.success && response.data.data) {
      this.setTokens(response.data.data.accessToken, response.data.data.refreshToken);
      return response.data.data;
    }
    throw new Error('Login failed');
  }

  async getMe(): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>('/auth/me');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch user');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Project endpoints
  async getProjects(): Promise<LegacyProject[]> {
    const response = await this.client.get<ApiResponse<LegacyProject[]>>('/projects');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch projects');
  }

  async getProject(id: string): Promise<LegacyProject> {
    const response = await this.client.get<ApiResponse<LegacyProject>>(`/projects/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch project');
  }

  async createProject(data: CreateProjectDto): Promise<LegacyProject> {
    const response = await this.client.post<ApiResponse<LegacyProject>>('/projects', data);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to create project');
  }

  async updateProject(id: string, data: UpdateProjectDto): Promise<LegacyProject> {
    const response = await this.client.patch<ApiResponse<LegacyProject>>(`/projects/${id}`, data);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to update project');
  }

  async deleteProject(id: string): Promise<void> {
    await this.client.delete(`/projects/${id}`);
  }

  async getProjectStats(id: string): Promise<ProjectStats> {
    const response = await this.client.get<ApiResponse<ProjectStats>>(`/projects/${id}/stats`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch project stats');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.client.get<ApiResponse<{ status: string; timestamp: string }>>('/health');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Health check failed');
  }
}

export const api = new ApiClient();
export default api;