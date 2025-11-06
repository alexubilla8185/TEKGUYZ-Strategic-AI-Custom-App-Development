import React from 'react';
import {
  Brain, Code2, Workflow, Compass, TrendingUp, ArrowDownCircle, Clock, Target,
  Maximize, Users, Zap, BarChart3
} from 'lucide-react';

export interface FormValues {
  projectType: string[];
  budget: string;
  timeline: string;
  description: string;
  currentSituation: string;
  goals: string[];
  successMetrics: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface Field {
  name: string;
  label: string;
  type: 'radio-chip' | 'select' | 'textarea' | 'checkbox-chip' | 'text' | 'email' | 'tel';
  placeholder?: string;
  options?: { value: string; label: string; icon?: React.ElementType }[];
  validation?: (value: any) => string | null;
  helperText?: string;
  maxLength?: number;
  autoComplete?: string;
}

export interface Step {
  title: string;
  fields: Field[];
}

const requiredField = (value: string | string[]) => 
  (typeof value === 'string' && value.trim() !== '' && value !== 'Select a range' && value !== 'Select a timeline') || (Array.isArray(value) && value.length > 0)
    ? null
    : 'This field is required.';

const emailValidation = (value: string) => {
    if (!value) return 'This field is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email (e.g., name@example.com).';
    return null;
}

const nameValidation = (value: string) => {
    if (!value || value.trim().length < 2) return `Please enter at least 2 characters.`;
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Please enter a valid name.'; // Allow apostrophes and hyphens
    return null;
}

const minLength = (min: number) => (value: string) => {
    if (!value || value.trim().length < min) return `Please provide more detail (at least ${min} characters).`;
    return null;
}

export const formStepsData: Step[] = [
  // Step 1: Project Type & Scope
  {
    title: 'Tell us about your project',
    fields: [
      {
        name: 'projectType',
        label: 'What type of solution do you need? (select all that apply)',
        type: 'checkbox-chip',
        validation: requiredField,
        options: [
          { value: 'ai-solutions', label: 'AI-Powered Solutions', icon: Brain },
          { value: 'custom-apps', label: 'Custom Applications', icon: Code2 },
          { value: 'automated-workflows', label: 'Automated Workflows', icon: Workflow },
          { value: 'strategic-consulting', label: 'Strategic Consulting', icon: Compass },
        ],
      },
      {
        name: 'budget',
        label: "What's your estimated budget?",
        type: 'select',
        validation: requiredField,
        options: [
          { value: '', label: 'Select a range' },
          { value: '<10k', label: 'Under $10,000' },
          { value: '10k-25k', label: '$10,000 - $25,000' },
          { value: '25k-50k', label: '$25,000 - $50,000' },
          { value: '50k-100k', label: '$50,000 - $100,000' },
          { value: '>100k', label: '$100,000+' },
          { value: 'unsure', label: 'Not sure yet' },
        ],
        helperText: "This helps us recommend the right approach.",
      },
      {
        name: 'timeline',
        label: 'When do you need this completed?',
        type: 'select',
        validation: requiredField,
        options: [
          { value: '', label: 'Select a timeline' },
          { value: '<1month', label: 'ASAP (< 1 month)' },
          { value: '1-3months', label: '1-3 months' },
          { value: '3-6months', label: '3-6 months' },
          { value: '6-12months', label: '6-12 months' },
          { value: 'flexible', label: 'Flexible / Ongoing' },
        ],
      },
    ],
  },
  // Step 2: Project Details
  {
    title: 'Help us understand your challenge',
    fields: [
      {
        name: 'description',
        label: 'Describe your project or challenge',
        type: 'textarea',
        placeholder: 'E.g., We need to automate our customer onboarding process which currently takes 3 days manually...',
        validation: minLength(50),
        maxLength: 1000,
      },
      {
        name: 'currentSituation',
        label: 'What are you currently doing? (Optional)',
        type: 'textarea',
        placeholder: 'E.g., Using spreadsheets and manual data entry...',
        maxLength: 500,
      },
    ],
  },
  // Step 3: Goals & Success Metrics
  {
    title: 'What does success look like?',
    fields: [
      {
        name: 'goals',
        label: 'Select your primary goals (choose all that apply)',
        type: 'checkbox-chip',
        validation: requiredField,
        options: [
          { value: 'increase-revenue', label: 'Increase revenue', icon: TrendingUp },
          { value: 'reduce-costs', label: 'Reduce costs', icon: ArrowDownCircle },
          { value: 'save-time', label: 'Save time', icon: Clock },
          { value: 'improve-accuracy', label: 'Improve accuracy', icon: Target },
          { value: 'scale-operations', label: 'Scale operations', icon: Maximize },
          { value: 'enhance-cx', label: 'Enhance customer experience', icon: Users },
          { value: 'competitive-advantage', label: 'Gain competitive advantage', icon: Zap },
          { value: 'data-insights', label: 'Better data insights', icon: BarChart3 },
        ],
      },
      {
        name: 'successMetrics',
        label: 'How will you measure success? (Optional)',
        type: 'textarea',
        placeholder: 'E.g., Reduce processing time by 50%, increase conversion rate by 20%...',
        maxLength: 500,
      },
    ],
  },
  // Step 4: Contact Information
  {
    title: "Let's connect",
    fields: [
      {
        name: 'name',
        label: 'Your name',
        type: 'text',
        placeholder: 'John Smith',
        validation: nameValidation,
        autoComplete: 'name',
      },
      {
        name: 'email',
        label: 'Email address',
        type: 'email',
        placeholder: 'john@company.com',
        validation: emailValidation,
        helperText: "We'll send project details here",
        autoComplete: 'email',
      },
      {
        name: 'phone',
        label: 'Phone number (optional)',
        type: 'tel',
        placeholder: '(555) 123-4567',
        autoComplete: 'tel',
      },
      {
        name: 'company',
        label: 'Company name (optional)',
        type: 'text',
        placeholder: 'Acme Inc.',
        autoComplete: 'organization',
      },
    ],
  },
];