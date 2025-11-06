import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';

const AIEthicsPage: React.FC = () => {
    return (
        <LegalPageLayout title="AI Ethics & Responsible Use" lastUpdated="January 2025">
            <h2>1. Our Commitment</h2>
            <p>
                We believe AI should augment human capabilities, not replace human judgment. Our approach to artificial intelligence prioritizes transparency, fairness, and accountability in every solution we build. We are committed to developing and deploying AI in a manner that is ethical, responsible, and beneficial to society.
            </p>

            <h2>2. Core Principles</h2>
            <p>Our work is guided by five core principles that form the foundation of our ethical framework:</p>
            
            <h3>Transparency</h3>
            <p>We ensure our clients and end-users understand when they are interacting with an AI system. We provide clear documentation of our AI's capabilities and limitations and maintain open communication about the data sources and methodologies used in its development.</p>

            <h3>Fairness & Bias Mitigation</h3>
            <p>We are dedicated to building equitable AI systems. This includes actively testing for and mitigating algorithmic bias, using diverse and representative data sets for training, and conducting regular audits of AI-driven decisions to ensure fair outcomes for all user groups.</p>
            
            <h3>Privacy & Security</h3>
            <p>We handle data with the utmost care, adhering to principles of data minimization and purpose limitation. Our systems are designed with robust security measures to protect data integrity and comply with global privacy regulations like GDPR and CCPA.</p>
            
            <h3>Human Oversight</h3>
            <p>We design our AI systems to be tools that support, not supplant, human decision-making. We ensure that critical decisions always involve human judgment and establish clear escalation paths for complex or edge cases that require expert review.</p>
            
            <h3>Accountability</h3>
            <p>We take full responsibility for the outcomes of our AI systems. This includes establishing clear ownership, maintaining documented decision-making processes, and providing mechanisms for redress and correction if an AI system produces an unintended or harmful result.</p>

            <h2>3. Our AI Assistant</h2>
            <p>
                Our on-site AI assistant, powered by Google Gemini, is designed for initial informational queries and lead qualification. It is not a substitute for professional consultation. All conversations are handled in line with our privacy principles, with data being anonymized and used exclusively for service improvement. Complex or sensitive questions are escalated to our human team for a direct response.
            </p>

            <h2>4. Client AI Projects</h2>
            <p>
                When developing AI solutions for our clients, we apply our ethical framework rigorously. This includes assessing the appropriateness of the AI use case, conducting risk evaluations before implementation, and establishing protocols for ongoing monitoring and adjustment to ensure the system operates responsibly in the real world.
            </p>
            
            <h2>5. Continuous Improvement</h2>
            <p>
                The field of AI ethics is constantly evolving. We are committed to staying current with the latest research, updating our practices, and actively seeking feedback from our clients, partners, and the wider community to continuously improve our responsible AI framework.
            </p>
            
            <h2>6. Questions or Concerns</h2>
            <p>
                If you have questions or wish to raise an ethical concern about our use of AI, please contact us at <a href="mailto:ethics@tekguyz.com">ethics@tekguyz.com</a>.
            </p>
        </LegalPageLayout>
    );
};

export default AIEthicsPage;