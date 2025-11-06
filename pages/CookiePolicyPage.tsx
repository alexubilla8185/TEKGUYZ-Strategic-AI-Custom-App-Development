import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';

const CookiePolicyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="January 2025">
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device (computer, tablet, mobile phone) when you visit a website. They help us remember your preferences and understand how you use our site, which allows us to improve your experience.
      </p>

      <h2>2. Cookies We Use</h2>
      <h3>Essential Cookies (Always Active)</h3>
      <p>These cookies are necessary for the website to function correctly and cannot be disabled. They are typically used for security, session management, and remembering your theme or privacy preferences.</p>
      
      <h3>Analytics Cookies (Can be Disabled)</h3>
      <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to analyze page views, user journeys, and overall site performance to make improvements.</p>
      
      <h3>Functional Cookies (Can be Disabled)</h3>
      <p>These cookies enable enhanced functionality, such as remembering your conversation state in our AI chatbot or your language preferences.</p>

      <h3>Advertising Cookies</h3>
      <p>We do not currently use advertising cookies or third-party tracking pixels for marketing purposes.</p>

      <h2>3. Managing Cookies</h2>
      <p>You can control and manage cookies through your browser settings. Below are links to instructions for popular browsers:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>
      <p>Please note that disabling certain cookies may affect the functionality of our website.</p>

      <h2>4. Third-Party Cookies</h2>
      <p>Some third-party services we use may also set cookies on your device. These include:</p>
      <ul>
          <li><strong>Google Analytics:</strong> To provide anonymous website analytics.</li>
          <li><strong>Google Gemini:</strong> May set cookies to manage the AI chat session.</li>
      </ul>
      <p>We recommend reviewing the cookie policies of these third-party services for more information.</p>

      <h2>5. Updates to This Policy</h2>
      <p>We may update this policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about our use of cookies, please email us at <a href="mailto:privacy@tekguyz.com">privacy@tekguyz.com</a>.</p>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;