import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto w-full border-b border-border-subtle">
      <Link to="/" className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors">
        <BrainCircuit className="text-accent" size={24} />
        <span className="font-display font-bold text-xl tracking-tight">StudyMind</span>
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/history" className="text-text-secondary hover:text-text-primary transition-colors">History</Link>
        <Link to="/upload" className="text-accent hover:brightness-110 transition-all">New Document</Link>
      </div>
    </nav>
  );
};
