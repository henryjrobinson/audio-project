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

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Project types
export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED';

export interface LegacyProject {
  id: string;
  subjectName: string;
  subjectAge?: number;
  subjectPhoto?: string;
  diagnosis?: string;
  diagnosisDate?: string;
  status: ProjectStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: User;
  members?: ProjectMember[];
  _count?: {
    conversations: number;
    stories: number;
    members: number;
  };
}

// Member types
export type MemberRole = 'ADMIN' | 'CONTRIBUTOR' | 'VIEWER';
export type MemberStatus = 'ACTIVE' | 'INVITED' | 'PENDING';

export interface ProjectMember {
  id: string;
  projectId: string;
  userId?: string;
  email: string;
  name: string;
  relationship: string;
  role: MemberRole;
  status: MemberStatus;
  invitedAt: string;
  joinedAt?: string;
  user?: User;
}

// Conversation types
export type ConversationStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'PROCESSING' | 'CANCELLED';

export interface Conversation {
  id: string;
  projectId: string;
  scheduledAt: string;
  completedAt?: string;
  duration: number;
  topic: string;
  status: ConversationStatus;
  audioUrl?: string;
  transcriptUrl?: string;
  storiesExtracted: number;
  emotionalMoments: number;
  clarityScore: number;
  specialNotes?: string;
  suggestedTopics: string[];
  createdAt: string;
  updatedAt: string;
}

// Story types
export type StoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EDITED';

export interface Story {
  id: string;
  projectId: string;
  conversationId: string;
  title: string;
  excerpt: string;
  fullContent: string;
  duration: string;
  tags: string[];
  status: StoryStatus;
  emotionalMoments: number;
  audioClipUrl?: string;
  relatedPhotos: string[];
  approvedBy?: string;
  approvedAt?: string;
  conversationDate: string;
  createdAt: string;
  updatedAt: string;
}

// Invitation types
export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'EXPIRED';

export interface Invitation {
  id: string;
  projectId: string;
  email: string;
  name: string;
  relationship: string;
  personalMessage?: string;
  token: string;
  status: InvitationStatus;
  sentAt: string;
  expiresAt: string;
  acceptedAt?: string;
}

// Project Statistics
export interface ProjectStats {
  conversations: {
    total: number;
    completed: number;
  };
  stories: {
    total: number;
    approved: number;
  };
  hours: number;
  members: number;
}

// Request DTOs
export interface RegisterDto {
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
  status?: ProjectStatus;
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