import { Brain, Code2, Workflow, Compass, LucideIcon } from 'lucide-react';

export interface Solution {
    icon: LucideIcon;
    title: string;
    color: 'primary' | 'error' | 'warning' | 'success';
    shortDescription: string;
    chips: string[];
    longDescription: string[];
    keyFeatures: string[];
    techStack: string[];
}

export const solutionsData: Solution[] = [
    {
        icon: Brain,
        title: 'AI-Powered Solutions',
        color: 'primary',
        shortDescription: 'Leverage AI to unlock predictive insights, create intelligent conversational experiences, and drive business growth.',
        chips: ['Chatbots', 'ML Models', 'NLP'],
        longDescription: [
            "We build bespoke AI solutions that transform data into a competitive advantage. Our team develops and deploys robust machine learning models to solve your most complex challenges, including creating intelligent chatbots that engage customers and automating decision-making.",
            "From strategy to scale, we deliver powerful, reliable, and secure systems that personalize customer experiences, optimize efficiency, and drive tangible business growth."
        ],
        keyFeatures: [
            'Intelligent Conversational AI',
            'Custom Model Development',
            'Predictive Analytics & Forecasting',
            'Computer Vision Systems',
        ],
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Google Cloud AI', 'AWS SageMaker']
    },
    {
        icon: Code2,
        title: 'Custom Applications',
        color: 'error',
        shortDescription: 'Bespoke software development tailored to your unique operational needs and strategic goals.',
        chips: ['Web Apps', 'Mobile Apps', 'APIs'],
        longDescription: [
            "Escape the limits of off-the-shelf software with high-performance, secure, and scalable custom applications. We build everything from complex enterprise platforms to engaging mobile apps, tailored to solve your unique challenges and deliver tangible value.",
            "Our transparent, agile process ensures on-time, on-budget delivery. We build robust, intuitive, and future-proof applications that grow with your business, leveraging our full-stack expertise and commitment to modern technologies."
        ],
        keyFeatures: [
            'Full-Stack Web & Mobile Development',
            'Scalable Backend & API Architecture',
            'Cloud-Native Application Design',
            'Human-Centered UI/UX Prototyping',
        ],
        techStack: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes']
    },
    {
        icon: Workflow,
        title: 'Automated Workflows',
        color: 'warning',
        shortDescription: 'Streamline your business processes with intelligent automation, reducing costs and human error.',
        chips: ['RPA', 'Process Mining', 'Integration'],
        longDescription: [
            "Free your team from repetitive tasks by transforming your operational workflows. We analyze your processes to implement intelligent automation that significantly boosts efficiency, reduces costs, and minimizes human error.",
            "Using RPA, API integrations, and AI-driven logic, we build resilient systems to handle everything from simple data entry to complex processes, allowing your team to focus on high-value, strategic work."
        ],
        keyFeatures: [
            'Robotic Process Automation (RPA)',
            'Business Process Analysis & Mining',
            'Custom API & System Integration',
            'AI-Enhanced Decision Logic',
        ],
        techStack: ['UiPath', 'Automation Anywhere', 'Zapier', 'MuleSoft', 'Custom Scripts (Python)']
    },
    {
        icon: Compass,
        title: 'Strategic Tech Consulting',
        color: 'success',
        shortDescription: 'Expert guidance on technology adoption, digital transformation, and long-term IT strategy.',
        chips: ['Roadmapping', 'Architecture', 'Due Diligence'],
        longDescription: [
            "Navigate the complex technology landscape with confidence. As your trusted partner, we provide pragmatic guidance to leverage technology as a strategic asset, ensuring your IT investments drive real growth and innovation.",
            "From digital transformation roadmaps to resilient system architecture and technical due-diligence, our services deliver actionable plans. We help you mitigate risks and build a scalable technology foundation to keep you ahead of the competition."
        ],
        keyFeatures: [
            'Digital Transformation Strategy',
            'Technology & Product Roadmapping',
            'Scalable System Architecture Design',
            'Technical Due Diligence',
        ],
        techStack: ['AWS', 'Google Cloud', 'Azure', 'TOGAF', 'Agile/Scrum', 'CI/CD']
    }
];