import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-surface">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pt-[100px] pb-[64px] md:pt-[120px] md:pb-[80px]">
        <Link 
          to="/"
          className="group w-full md:w-auto h-12 md:h-auto inline-flex items-center justify-center gap-2 mb-8 px-5 md:px-4 py-[13px] md:py-2.5 border border-outline-variant rounded-[10px] text-sm font-medium text-primary-50 hover:bg-primary-container hover:border-primary-40 hover:scale-[1.02] transition-all duration-200 ease-out"
        >
          <ArrowLeft size={20} className="text-primary-50" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-4xl md:text-[36px] font-bold text-on-surface leading-tight">
          {title}
        </h1>
        <p className="text-sm text-on-surface-variant mt-4 mb-12">
          Last updated: {lastUpdated}
        </p>
        <div className="prose-legal">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;