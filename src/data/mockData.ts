import { User,  ImageManager } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Developer',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Designer',
    status: 'inactive',
    createdAt: '2024-01-10'
  }
];


export const mockEvents: ImageManager[] = [
  {
    id: '1',
    title: 'Project Kickoff Meeting',
    description: 'Initial meeting to discuss project requirements and timeline'
  },
  {
    id: '2',
    title: 'Design Review Presentation',
    description: 'Present design mockups to stakeholders'
  },
  {
    id: '3',
    title: 'Development Training Workshop',
    description: 'Training session on new development frameworks'
  },
  {
    id: '4',
    title: 'Project Deadline',
    description: 'Final deadline for project delivery'
  }
];
