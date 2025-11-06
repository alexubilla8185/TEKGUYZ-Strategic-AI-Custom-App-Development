import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

import { useGlobalStore } from '../../store/globalStore';
import Logomark from '../branding/Logomark';
import Wordmark from '../branding/Wordmark';
import Button from '../common/Button';
import { useRipple } from '../../hooks/useRipple';

const Footer: React.FC = () => {
  const { setActiveModal } = useGlobalStore();
  const { addRipple, RippleElements } = useRipple<HTMLElement>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (event: React.MouseEvent<HTMLElement>, selector: string) => {
    addRipple(event);
    const targetId = selector.substring(1);

    if (selector === '#top') {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
        return;
    }

    // For other anchor links like '#solutions'
    if (location.pathname === '/') {
        // Already on the home page, so just scroll
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    } else {
        // Not on the home page, navigate and let the browser handle the hash jump.
        navigate(`/#${targetId}`);
    }
  };
  
  const handleScrollToWithRipple = (selector: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      addRipple(event);
      handleScrollTo(event, selector);
  }
  
  const handleAccessibilityClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(event);
    setActiveModal('accessibility-modal');
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com', label: 'Visit our LinkedIn page' },
    { icon: Github, href: 'https://github.com', label: 'Visit our GitHub profile' },
    { icon: Mail, href: 'mailto:hello@tekguyz.com', label: 'Email us' },
  ];

  const navLinks = [
    { name: 'Home', action: handleScrollToWithRipple('#top') },
    { name: 'Solutions', action: handleScrollToWithRipple('#solutions') },
    { name: 'Our Work', action: handleScrollToWithRipple('#work') },
    { name: 'Process', action: handleScrollToWithRipple('#process') },
    { name: 'About Us', action: handleScrollToWithRipple('#about') },
  ];

  const resourceLinks = [
    { name: 'Privacy Policy', isRoute: true, href: '/privacy' },
    { name: 'Terms of Service', isRoute: true, href: '/terms' },
    { name: 'AI Ethics Statement', isRoute: true, href: '/ai-ethics' },
    { name: 'Cookie Policy', isRoute: true, href: '/cookie-policy' },
  ];

  const focusClasses = "rounded-sm";
  
  const RippledLink: React.FC<{
      href: string;
      isRoute?: boolean;
      children: React.ReactNode;
      className?: string;
    }> = ({ href, isRoute, children, className }) => {
      const { addRipple, RippleElements } = useRipple<HTMLAnchorElement>();
      const combinedClassName = `relative overflow-hidden text-sm text-on-surface-variant hover:text-primary-50 hover:translate-x-1 transition-all duration-200 ease-out inline-block rounded-md py-2 px-1 -my-2 -mx-1 ${focusClasses} ${className}`;
  
      if (isRoute) {
        return (
          <Link to={href} className={combinedClassName} onClick={addRipple}>
            {children}
            <RippleElements />
          </Link>
        );
      }
      return (
        <a href={href} className={combinedClassName} onClick={addRipple}>
          {children}
          <RippleElements />
        </a>
      );
  };
  
  const RippledSocialIcon: React.FC<{href: string; label: string; icon: React.ElementType}> = ({ href, label, icon: Icon }) => {
    const { addRipple, RippleElements } = useRipple<HTMLAnchorElement>();
    return (
       <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" onClick={addRipple} className={`relative w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:border-primary-40 hover:scale-105 hover:text-primary-50 transition-all duration-200 overflow-hidden ${focusClasses}`}>
          <Icon size={20} />
          <RippleElements />
        </a>
    )
  }

  return (
    <>
      <footer className="relative bg-surface-container-high border-t border-outline-variant z-[1]" role="contentinfo">
        {/* Main Footer Content */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-x-8 lg:gap-x-12 gap-y-12">
            
            {/* Column 1: Brand & Mission */}
            <div className="col-span-2 md:col-span-1">
              <button onClick={(e) => handleScrollTo(e, '#top')} aria-label="TEKGUYZ, scroll to top" className={`relative overflow-hidden flex items-center gap-3 mb-5 group p-2 -m-2 rounded-lg ${focusClasses}`}>
                <Logomark size={48} />
                <Wordmark className="text-[22px] font-semibold tracking-[-0.5px]" />
                <RippleElements />
              </button>
              <p className="text-sm text-on-surface-variant max-w-[320px] leading-[1.6]">
                Building intelligent solutions that transform how businesses operate. AI-powered, human-focused.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((link, i) => (
                  <RippledSocialIcon key={i} {...link} />
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-[1px] mb-4">Navigation</h2>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <button onClick={link.action} className={`relative overflow-hidden text-sm text-on-surface-variant hover:text-primary-50 hover:translate-x-1 transition-all duration-200 ease-out py-2 px-1 -my-2 -mx-1 rounded-md ${focusClasses}`}>
                        {link.name}
                        <RippleElements />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-[1px] mb-4">Resources</h2>
              <nav aria-label="Footer legal and resource links">
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.name}>
                        <RippledLink href={link.href} isRoute={link.isRoute}>{link.name}</RippledLink>
                    </li>
                  ))}
                   <li>
                      <button onClick={handleAccessibilityClick} className={`relative overflow-hidden text-sm text-on-surface-variant hover:text-primary-50 hover:translate-x-1 transition-all duration-200 ease-out py-2 px-1 -my-2 -mx-1 rounded-md ${focusClasses}`}>
                        Accessibility
                        <RippleElements />
                      </button>
                    </li>
                </ul>
              </nav>
            </div>

            {/* Column 4: CTA */}
            <div className="col-span-2 md:col-span-1">
               <div className="bg-primary-10/70 p-5 rounded-2xl border border-primary-40 max-w-[320px]">
                <h3 className="text-base font-medium text-primary-100 mb-1">Ready to start?</h3>
                <p className="text-xs text-primary-90/80 mb-4">Tell us about your project.</p>
                <Button onClick={() => setActiveModal('project-form')} variant="primary" className="w-full h-12 text-base group">
                  Start a Project
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button as="a" href="mailto:hello@tekguyz.com" variant="text" className="w-full mt-2 h-10 text-sm">
                   <Mail size={16} className="mr-2" />
                   Email Us Instead
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-surface-container-highest border-t border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 md:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
              <p className="text-xs text-on-surface-variant text-center md:text-left order-3 md:order-1">
                &copy; {new Date().getFullYear()} TEKGUYZ. All rights reserved.
              </p>
              <nav className="hidden md:flex items-center gap-6 order-2" aria-label="Secondary legal links">
                {/* FIX: The RippledLink component expects an 'href' prop, not 'to'. */}
                <RippledLink href="/privacy" isRoute={true} className="text-xs !p-1 !-m-1 !hover:translate-x-0 hover:underline">Privacy Policy</RippledLink>
                 <span aria-hidden="true" className="text-on-surface-variant/50">•</span>
                {/* FIX: The RippledLink component expects an 'href' prop, not 'to'. */}
                <RippledLink href="/terms" isRoute={true} className="text-xs !p-1 !-m-1 !hover:translate-x-0 hover:underline">Terms of Service</RippledLink>
              </nav>
               <p className="text-xs text-on-surface-variant order-1 md:order-3">
                 Built by TEKGUYZ
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;