
export type UserRole = 'HOMEOWNER' | 'CONTRACTOR';
export type AppTab = 'DASHBOARD' | 'MARKETPLACE' | 'LEADS' | 'TEAM' | 'MESSAGES';

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'PENDING' | 'IN_ESCROW' | 'COMPLETED' | 'RELEASED';
  dueDate: string;
  description: string;
}

export interface ProgressUpdate {
  id: string;
  date: string;
  imageUrl: string;
  comment: string;
  author: string;
}

export interface ProjectData {
  id: string;
  clientName: string;
  clientAge: number;
  projectTitle: string;
  totalBudget: number;
  commissionRate: number;
  milestones: Milestone[];
  progressFeed: ProgressUpdate[];
  contractSigned: boolean;
  startDate: string;
  endDate: string;
}

export interface ContractorProfile {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  completedJobs: number;
  trustScore: number;
  hourlyRate: number;
  imageUrl: string;
  verified: boolean;
}

export interface JobLead {
  id: string;
  title: string;
  client: string;
  budget: string;
  distance: string;
  postedDate: string;
  status: 'NEW' | 'QUOTE_SENT' | 'ARCHIVED';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'ON_SITE' | 'OFF_SITE' | 'UPCOMING';
  phone: string;
  avatar: string;
}
