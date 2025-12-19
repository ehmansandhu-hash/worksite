
import { ProjectData, ContractorProfile, JobLead, Message, TeamMember } from './types';

export const INITIAL_PROJECT_DATA: ProjectData = {
  id: 'PRJ-101',
  clientName: 'Morgan',
  clientAge: 42,
  projectTitle: 'Master Bathroom Remodel',
  totalBudget: 6500,
  commissionRate: 0.05,
  startDate: '2024-03-01',
  endDate: '2024-04-15',
  contractSigned: true,
  milestones: [
    {
      id: 'm1',
      title: 'Initial Deposit & Permits',
      amount: 1500,
      status: 'RELEASED',
      dueDate: '2024-03-01',
      description: 'Project mobilization and city permit filing.'
    },
    {
      id: 'm2',
      title: 'Demolition & Rough-in',
      amount: 2000,
      status: 'COMPLETED',
      dueDate: '2024-03-10',
      description: 'Removal of old fixtures and plumbing preparation.'
    },
    {
      id: 'm3',
      title: 'Tile & Cabinetry',
      amount: 2000,
      status: 'IN_ESCROW',
      dueDate: '2024-03-25',
      description: 'Installation of floor/wall tiles and vanity.'
    },
    {
      id: 'm4',
      title: 'Final Fixtures & Inspection',
      amount: 1000,
      status: 'PENDING',
      dueDate: '2024-04-10',
      description: 'Punch list items and city inspector sign-off.'
    }
  ],
  progressFeed: [
    {
      id: 'p1',
      date: '2024-03-12',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      comment: 'Demolition complete. New copper pipes installed.',
      author: 'Summit Construction (Lead Contractor)'
    },
    {
      id: 'p2',
      date: '2024-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?auto=format&fit=crop&q=80&w=800',
      comment: 'Waterproofing membrane applied to shower floor.',
      author: 'Summit Construction (Lead Contractor)'
    }
  ]
};

export const MOCK_CONTRACTORS: ContractorProfile[] = [
  {
    id: 'c1',
    name: 'Precision Plumbing & Tile',
    specialty: 'Bathroom Specialists',
    rating: 4.9,
    completedJobs: 142,
    trustScore: 98,
    hourlyRate: 85,
    imageUrl: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'c2',
    name: 'VoltStream Electrical',
    specialty: 'Smart Home & Wiring',
    rating: 4.8,
    completedJobs: 89,
    trustScore: 95,
    hourlyRate: 110,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'c3',
    name: 'EcoBuild HVAC',
    specialty: 'Climate Control',
    rating: 4.7,
    completedJobs: 210,
    trustScore: 92,
    hourlyRate: 95,
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200',
    verified: true
  }
];

export const MOCK_LEADS: JobLead[] = [
  {
    id: 'l1',
    title: 'Kitchen Backsplash Installation',
    client: 'Sarah J.',
    budget: '$1,200 - $1,800',
    distance: '2.4 miles',
    postedDate: '2 hours ago',
    status: 'NEW'
  },
  {
    id: 'l2',
    title: 'Full Basement Finishing',
    client: 'David W.',
    budget: '$15,000+',
    distance: '5.1 miles',
    postedDate: '1 day ago',
    status: 'QUOTE_SENT'
  },
  {
    id: 'l3',
    title: 'Outdoor Deck Repair',
    client: 'Emily R.',
    budget: '$2,500 - $4,000',
    distance: '0.8 miles',
    postedDate: '3 hours ago',
    status: 'NEW'
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'msg1', senderId: 'c1', senderName: 'Precision Plumbing', text: "Hey Morgan, the tile shipment just arrived. We'll be starting the floor tomorrow morning at 8 AM.", timestamp: '10:45 AM', isMe: false },
  { id: 'msg2', senderId: 'morgan', senderName: 'Morgan', text: "That's great news! I'll make sure the side gate is unlocked.", timestamp: '11:10 AM', isMe: true },
  { id: 'msg3', senderId: 'c1', senderName: 'Precision Plumbing', text: "Perfect. Also, did you decide on the grout color? The 'Pearl Gray' would look sharp with that marble.", timestamp: '11:15 AM', isMe: false },
];

export const MOCK_TEAM: TeamMember[] = [
  { id: 't1', name: 'Jake Thorne', role: 'Lead Plumber', status: 'ON_SITE', phone: '555-0123', avatar: 'https://i.pravatar.cc/150?u=jake' },
  { id: 't2', name: 'Maria Garcia', role: 'Tile Specialist', status: 'OFF_SITE', phone: '555-0124', avatar: 'https://i.pravatar.cc/150?u=maria' },
  { id: 't3', name: 'Sam Chen', role: 'Apprentice', status: 'ON_SITE', phone: '555-0125', avatar: 'https://i.pravatar.cc/150?u=sam' },
];
