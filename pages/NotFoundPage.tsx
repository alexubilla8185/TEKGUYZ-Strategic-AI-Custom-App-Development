import React from 'react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
    return (
        <div className="container py-16 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-6xl font-bold text-primary-50 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-on-surface mb-2">Page Not Found</h2>
            <p className="text-on-surface-variant mb-8">Sorry, the page you are looking for does not exist.</p>
            <Button as="link" to="/" className="px-6 py-3">
                Return to Homepage
            </Button>
        </div>
    );
};

export default NotFoundPage;
