import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, interactive = false, className = '', ...props }) => {
  const baseClasses = 'glass rounded-xl p-6';
  const interactiveClasses = interactive ? 'cursor-pointer hover:border-accent-border/60 hover:bg-accent-dim/20 transition-all duration-300' : 'transition-colors duration-200 hover:border-border-default/40';
  
  return (
    <motion.div 
      whileHover={interactive ? { y: -2 } : { y: -1 }}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
