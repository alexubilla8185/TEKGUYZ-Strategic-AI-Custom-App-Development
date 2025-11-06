import { CaseStudy, AdditionalProject } from '../types';

export const featuredCaseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-ai-assistant',
    title: 'E-Commerce AI Assistant',
    badgeText: 'AI-Powered Solutions',
    badgeColor: 'primary',
    outcome: 'Slashed cart abandonment by 25% and boosted average order value by 12% with a conversational AI shopping assistant.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'A user interacting with a conversational AI assistant on a retail website.',
    industry: 'E-commerce',
    metrics: [
        { value: 25, prefix: '-', suffix: '%', label: 'Cart Abandonment' },
        { value: 70, suffix: '%', label: 'AI-Handled Queries' },
        { value: 12, prefix: '+', suffix: '%', label: 'Avg. Order Value' },
        { value: 60, suffix: '%', label: 'Support Lead Drop' }
    ],
    overview: [
        "A leading online retailer was losing sales due to high cart abandonment and an overwhelmed support team. Customers couldn't find answers quickly, leading to lost revenue, especially during peak seasons."
    ],
    challenge: [
        "A major retailer faced high cart abandonment and a strained support team, especially during their busiest hours."
    ],
    solution: [
        "We built a conversational AI shopping assistant that helps users find products, answers questions, and offers discounts."
    ],
    results: {
        summary: [
            "The AI-powered assistant directly boosted revenue by slashing cart abandonment and increasing average order value."
        ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Gemini', 'Firebase']
  },
  {
    id: 'internal-knowledge-base',
    title: 'Internal Knowledge Base AI',
    badgeText: 'AI-Powered Solutions',
    badgeColor: 'primary',
    outcome: 'Boosted enterprise productivity by deploying an intelligent chatbot that searches thousands of internal documents, saving employees an average of 5 hours per week.',
    imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'An employee using an intelligent search interface to find information in a corporate knowledge base.',
    industry: 'Enterprise',
    metrics: [
        { value: 5, suffix: ' hrs/wk', label: 'Time Saved' },
        { value: 10000, suffix: '+', label: 'Docs Indexed' },
        { value: 95, suffix: '%', label: 'Search Accuracy' },
        { value: 88, suffix: '%', label: 'User Satisfaction' }
    ],
    overview: [
        "A large enterprise's productivity was crippled by siloed, hard-to-find internal documentation, wasting valuable employee time and resources."
    ],
    challenge: [
        "Employees struggled to find accurate information across thousands of scattered documents, leading to wasted time and inconsistent decision-making."
    ],
    solution: [
        "We developed an AI-powered assistant that instantly finds and synthesizes accurate answers from thousands of internal documents."
    ],
    results: {
        summary: [
            "The system boosted enterprise productivity by saving the average employee 5 hours per week on information retrieval."
        ]
    },
    techStack: ['Python', 'LangChain', 'Google Gemini', 'Pinecone', 'React', 'Docker', 'Kubernetes']
  },
  {
    id: 'digital-blueprint-construction',
    title: 'Digital Blueprint for Construction',
    badgeText: 'Strategic Consulting',
    badgeColor: 'success',
    outcome: "Guided a construction firm's digital transformation, boosting project turnaround by 40% and improving budget control through modern, cloud-based workflows.",
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Construction managers reviewing digital blueprints on a tablet at a job site.',
    industry: 'Construction',
    metrics: [
        { value: 40, suffix: '%', label: 'Faster Turnaround' },
        { value: 50, suffix: '+', label: 'Staff Onboarded' },
        { value: 90, suffix: '%', label: 'Budget Accuracy' },
        { value: 75, suffix: '%', label: 'Rework Reduction' }
    ],
    overview: [
        "A growing construction firm was hitting a ceiling imposed by its outdated, paper-based project management processes, leading to costly delays."
    ],
    challenge: [
        "Communication gaps between field and office teams were leading to costly project delays, rework, and inefficient resource allocation."
    ],
    solution: [
        "We guided a digital transformation, implementing a modern, cloud-based platform to unify all project data and workflows."
    ],
    results: {
        summary: [
            "The new platform boosted project turnaround by 40% and improved budget accuracy through real-time data visibility."
        ]
    },
    techStack: ['Procore API', 'Data Analytics', 'Power BI', 'Change Management', 'Cloud Migration (Azure)', 'Agile Methodologies']
  },
  {
    id: 'event-management-app',
    title: 'Event Management App',
    badgeText: 'Custom Applications',
    badgeColor: 'error',
    outcome: 'Launched a cross-platform app for a major tech conference, managing ticketing and scheduling for 3,000+ attendees with 99.9% uptime.',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Attendees using the event management app on their phones at a conference.',
    industry: 'Events / Technology',
    metrics: [
        { value: 3000, suffix: '+', label: 'Attendees Managed' },
        { value: 30, suffix: '%', label: 'Engagement Boost' },
        { value: 99.9, suffix: '%', label: 'Uptime' },
        { value: 50, suffix: '%', label: 'Info Desk Drop' }
    ],
    overview: [
        "A major tech conference needed a reliable mobile app to manage logistics for over 3,000 attendees, but faced challenges with scalability."
    ],
    challenge: [
        "The organizer needed a scalable solution to handle ticketing, complex scheduling, and real-time announcements for thousands of concurrent users."
    ],
    solution: [
        "We developed a cross-platform mobile app with a resilient backend to manage all event logistics, from registration to live Q&A sessions."
    ],
    results: {
        summary: [
            "The app delivered a seamless experience, boosting attendee engagement by 30% and receiving overwhelmingly positive feedback."
        ]
    },
    techStack: ['React Native', 'GraphQL', 'Firebase', 'Node.js', 'Google Cloud']
  }
];

export const additionalProjects: AdditionalProject[] = [
    { 
        title: 'Project Management Tool',
        description: "A privacy-first task management app using AI to boost productivity, not compromise user data.",
        solution: 'Custom Applications',
        technologies: ['React', 'TypeScript', 'Google Gemini']
    },
    { 
        title: "AI Maître D'",
        description: "A bilingual digital storefront for a restaurant, featuring a helpful AI maître d' to guide users.",
        solution: 'AI-Powered Solutions',
        technologies: ['React', 'TypeScript', 'Google Gemini']
    },
    { 
        title: 'AI-Verified Community',
        description: "Engineered a secure social network with an AI 'gatekeeper' to ensure a private, verified community.",
        solution: 'Custom Applications',
        technologies: ['React', 'TypeScript', 'Google Gemini']
    },
    { 
        title: 'Living Heritage AI',
        description: "A memorial platform using generative AI to create a conversational link to family heritage.",
        solution: 'AI-Powered Solutions',
        technologies: ['React', 'Google Gemini', 'Supabase']
    },
    { 
        title: 'Automated Lead Processing',
        description: "An automated workflow to ingest, validate, and sync marketing leads, saving hours of manual work.",
        solution: 'Automated Workflows',
        technologies: ['Zapier', 'Salesforce API', 'Python']
    },
    { 
        title: 'Legacy System Migration',
        description: "Migrated a provider's critical patient data system to the cloud with zero downtime, boosting performance 10x.",
        solution: 'Strategic Consulting',
        technologies: ['AWS', 'Kubernetes', 'Terraform']
    },
];