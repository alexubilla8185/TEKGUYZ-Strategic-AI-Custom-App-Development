export type Theme = 'dark' | 'true-black';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ProjectFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
}

export interface CaseStudyMetric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  badgeText: string;
  badgeColor: 'primary' | 'error' | 'warning' | 'success';
  outcome: string;
  imageUrl: string;
  heroImageUrl: string;
  imageAlt: string;
  industry: string;
  metrics: CaseStudyMetric[];
  overview: string[];
  challenge: string[];
  solution: string[];
  results: {
    summary: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    }
  };
  techStack: string[];
}

export interface AdditionalProject {
  title: string;
  description: string;
  solution: string;
  technologies?: string[];
}

export type ModalType = 'project-form' | 'image-viewer' | 'settings' | 'solution-modal' | 'case-study-modal' | 'accessibility-modal' | null;