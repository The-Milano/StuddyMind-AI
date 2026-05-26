import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded px-6 py-2.5 font-semibold transition-all duration-150 text-sm';
  
  const variants = {
    primary: 'bg-accent text-base hover:brightness-110',
    secondary: 'bg-card border border-border-default text-text-primary hover:border-border-strong hover:bg-hover',
    ghost: 'bg-transparent text-text-secondary hover:bg-hover hover:text-text-primary',
  };
  
  const disabledClasses = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '';
  
  return (
    <motion.button 
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
