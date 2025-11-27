
/**
 * DESIGN SYSTEM NOTES
 * 
 * TYPOGRAPHY:
 * - Headings: Inter Bold/Black.
 * - Letter Spacing for Headings: -5% (Use class `tracking-[-0.05em]`)
 * 
 * COLORS:
 * - Borders/Lines: #EBE9E9
 * - Backgrounds (Sidebar/Box): #EBE9E9
 * - Input Fields: Very Light Grey #F9F9F9 (Lighter than #EBE9E9)
 */

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
  isAiGenerated?: boolean;
  attachments?: string[]; // Array of image URLs/File URLs
}

export interface Asset {
  name: string;
  url: string;
  type: 'PDF' | 'PNG' | 'JPG' | 'SVG' | 'AI';
  size: string;
}

export interface ProjectTask {
  id: string;
  category: string; // e.g., BRANDING
  title: string; // e.g., EMBALLAGE DESIGN
  status: ProjectStatus;
  imageUrl: string;
  comments: Comment[];
  assets: Asset[]; // Deliverable files
  createdAt: string; // Date when the project/design was made
  lastUpdated: string;
}