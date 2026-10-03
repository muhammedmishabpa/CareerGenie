export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  department?: string;
  location?: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  honors?: string;
  period: string;
}

export interface SkillItem {
  name: string;
  match: number;
  weight: number;
  active: boolean;
  category?: string;
}

export interface ResumeData {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  github: string;
  avatarUrl: string;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  targetTitle: string;
  targetCompany: string;
  jobDescription: string;
  skills: SkillItem[];
  selectedTemplateId: string;
  accentColor: string;
  fontFamily: string;
  density: 'compact' | 'balanced' | 'relaxed';
}

export type ScreenTab =
  | 'details'
  | 'job-and-ai-match'
  | 'templates'
  | 'ats-checker'
  | 'export-and-analyze'
  | 'live-example';
