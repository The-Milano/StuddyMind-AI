import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent to-transparent" />
      
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="font-mono text-8xl md:text-9xl font-bold text-accent mb-4 drop-shadow-[0_0_15px_rgba(0,229,160,0.3)]">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};
