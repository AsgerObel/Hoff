// Projekt status og bruger-typer

export enum ProjectStatus {
  PENDING = 'AFVENTER DIG',
  IN_PROGRESS = 'IGANGVÆRENDE',
  APPROVED = 'GODKENDT'
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface Asset {
  name: string;
  url: string;
  type: 'PDF' | 'PNG' | 'JPG' | 'SVG' | 'AI';
  size: string;
}

export interface ProjectTask {
  id: string;
  category: string;
  title: string;
  status: ProjectStatus;
  imageUrl: string;
  comments: Comment[];
  assets: Asset[];
  createdAt: string;
  lastUpdated: string;
}