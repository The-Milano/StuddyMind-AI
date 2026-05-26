import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { RotateCcw, ArrowLeft } from 'lucide-react';

export const ScoreScreen = ({ score, total, onRetry, onBack }) => {
  const percentage = (score / total) * 100;
  
  let message = "Keep studying — try again";
  if (percentage === 100) message = "Perfect score! 🎉";
  else if (percentage >= 80) message = "Excellent work!";
  else if (percentage >= 60) message = "Good effort — review the summary";

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-2xl p-8 md:p-12 shadow-sm text-center animate-fade-in-up border border-border-subtle/30 bg-white/40">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
        className="mb-6"
      >
        <span className="font-display text-7xl md:text-8xl font-bold text-accent">
          {score}
        </span>
        <span className="font-display text-3xl md:text-4xl text-text-muted">
          {' '} / {total}
        </span>
      </motion.div>
      
      <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-12">
        {message}
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="ghost" onClick={onRetry} className="w-full sm:w-auto gap-2 hover:bg-hover">
          <RotateCcw className="w-4 h-4 text-accent2" />
          <span>Try Again</span>
        </Button>
        <Button onClick={onBack} className="w-full sm:w-auto gap-2 shadow-[0_2px_12px_rgba(194,101,42,0.15)] btn-shimmer text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Summary</span>
        </Button>
      </div>
    </div>
  );
};
