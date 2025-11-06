import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useRipple } from '../../hooks/useRipple';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'text' | 'outlined';
  as?: 'button' | 'a' | 'link';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type ButtonAsA = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'a';
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'link';
  };

type ButtonProps = ButtonAsButton | ButtonAsA | ButtonAsLink;

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', className = '', children, as = 'button', ...rest } = props;
  
  const rippleColor = variant === 'primary' ? 'bg-white/30' : 'bg-primary-50/20';
  const { addRipple, RippleElements } = useRipple<HTMLElement>({ color: rippleColor });

  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-shadow';
  
  const variantClasses = {
    primary: 'bg-primary-40 text-white elevation-1 hover:elevation-2',
    secondary: 'bg-surface-container-high text-on-surface elevation-1 hover:elevation-2',
    outlined: 'border border-outline text-primary-50 bg-transparent hover:bg-primary-50/10',
    text: 'text-primary-50 hover:bg-primary-50/10',
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    addRipple(event);
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const commonProps = {
    className: combinedClassName,
    onClick: handleClick,
  };

  switch (as) {
    case 'a':
      return (
        <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} {...commonProps}>
          {children}
          <RippleElements />
        </a>
      );
    case 'link':
       return (
        <Link {...(rest as LinkProps)} {...commonProps}>
          {children}
          <RippleElements />
        </Link>
      );
    default:
      return (
        <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} {...commonProps}>
          {children}
          <RippleElements />
        </button>
      );
  }
};

export default Button;