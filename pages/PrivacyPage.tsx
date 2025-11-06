import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';

const PrivacyPage: React.FC = () => {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="January 2025">
            <h2>1. Introduction</h2>
            <p>
                At <strong>TEKGUYZ</strong> ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide to Us</h3>
            <p>We collect personal information that you voluntarily provide to us when you fill out our project inquiry form, contact us via email, or subscribe to our newsletter. This information may include your <strong>name</strong>, <strong>email address</strong>, <strong>phone number</strong>, <strong>company name</strong>, and any project details you provide.</p>
            <h3>Information We Collect Automatically</h3>
            <p>When you navigate our website, we may use automatic data collection technologies to collect certain information about your device, browsing actions, and patterns. This includes analytics data such as your IP address, browser type, and operating system.</p>
            <h3>AI Chat Data</h3>
            <p>Conversations with our AI assistant are processed to provide you with responses. We may log these conversations in an <strong>anonymized format</strong> to monitor for quality, improve our services, and train our AI models. We do not use this data for any other purpose.</p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for various business purposes, including to:</p>
            <ul>
                <li>Respond to your inquiries and provide you with the services you request.</li>
                <li>Improve, maintain, and optimize our website and user experience.</li>
                <li>Send you relevant marketing communications and updates, but only with your explicit consent.</li>
                <li>Analyze usage patterns to enhance the performance and security of our services.</li>
                <li>Comply with legal and regulatory obligations.</li>
            </ul>

            <h2>4. Data Storage and Security</h2>
            <p>Your information is stored on secure cloud infrastructure and through trusted third-party services like Netlify for hosting and form submissions. We implement robust security measures, including encryption and access controls, to protect your personal information from unauthorized access, use, or disclosure.</p>
            
            <h2>5. Your Rights</h2>
            <p>You have certain rights regarding your personal information. Subject to local law, you may have the right to:</p>
            <ul>
                <li><strong>Access</strong> your personal data that we hold.</li>
                <li>Request the <strong>correction</strong> of inaccurate data or <strong>deletion</strong> of your data.</li>
                <li><strong>Withdraw your consent</strong> for data processing at any time.</li>
                <li>Request data <strong>portability</strong>.</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
            
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies to enhance your experience. For detailed information about the cookies we use and how you can manage them, please see our <a href="/#/cookie-policy">Cookie Policy</a>.</p>

            <h2>7. Third-Party Services</h2>
            <p>We utilize third-party services to provide and improve our offerings. These services include:</p>
            <ul>
                <li><strong>Google Gemini AI:</strong> Powers our AI chatbot functionality.</li>
                <li><strong>Netlify:</strong> Used for website hosting and secure form submissions.</li>
                <li><strong>Analytics Tools:</strong> To understand website traffic and user behavior.</li>
            </ul>
            <p>These third parties have their own privacy policies governing their use of your information.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this policy periodically.</p>
            
            <h2>9. Contact Us</h2>
            <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at <a href="mailto:privacy@tekguyz.com">privacy@tekguyz.com</a>. We are committed to resolving any privacy-related issues promptly.
            </p>
        </LegalPageLayout>
    );
};

export default PrivacyPage;