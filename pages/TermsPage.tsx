import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';

const TermsPage: React.FC = () => {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="January 2025">
            <h2>1. Agreement to Terms</h2>
            <p>
                By accessing our website, tekguyz.com, or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Services Overview</h2>
            <p>
                TEKGUYZ provides AI consulting, custom software development, and strategic technology services. Any information, proposals, or quotes provided during initial consultations are for informational purposes only and do not constitute a binding agreement until a formal service agreement is signed.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>As a user of our site and services, you agree to:</p>
            <ul>
                <li>Provide accurate and complete information when submitting inquiries or project forms.</li>
                <li>Use our website and services for lawful purposes only and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.</li>
                <li>Not attempt to gain unauthorized access to our systems or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of our services.</li>
                <li>Not misuse the AI assistant for generating inappropriate content, attempting to find security vulnerabilities, or for any purpose other than its intended informational use.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
                All content on this website, including text, graphics, logos, icons, images, and the compilation thereof, and any software used on the site, is the property of TEKGUYZ or its suppliers and protected by copyright and other intellectual property laws. You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission from us.
            </p>
            
            <h2>5. Project Engagement</h2>
            <h3>Proposals and Quotes</h3>
            <p>All proposals and quotes are non-binding estimates based on initial information. A formal, signed Statement of Work or Service Agreement will supersede any preliminary discussions and will govern the terms of the project engagement.</p>
            <h3>Payment Terms</h3>
            <p>Specific payment terms, including schedules and amounts, will be detailed in your project's service agreement.</p>

            <h2>6. AI Assistant Terms</h2>
            <p>
                Our AI assistant is provided for informational purposes to help guide your inquiries. It is not a substitute for professional advice. While we strive for accuracy, we do not guarantee the correctness or applicability of the information provided by the AI. Conversations may be logged and reviewed for quality assurance and service improvement, in an anonymized format where possible.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
                To the fullest extent permitted by law, TEKGUYZ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your access to or use of our website or services. Our website and services are provided on an "as-is" and "as-available" basis.
            </p>

            <h2>8. Dispute Resolution</h2>
            <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TEKGUYZ is located, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved through binding arbitration in that jurisdiction.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
                We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last Updated" date on this page. Your continued use of the site after any such changes constitutes your acceptance of the new Terms of Service.
            </p>

            <h2>10. Contact Information</h2>
            <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@tekguyz.com">legal@tekguyz.com</a>.
            </p>
        </LegalPageLayout>
    );
};

export default TermsPage;