import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const QuizCard = ({ question, total, currentIndex, onNext, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCheck = () => {
    if (selected) {
      setIsRevealed(true);
    }
  };

  const handleNext = () => {
    const isCorrect = selected === question.answer;
    setIsRevealed(false);
    setSelected(null);
    
    if (currentIndex < total - 1) {
      onNext(isCorrect);
    } else {
      onComplete(isCorrect);
    }
  };

  const getOptionParts = (opt) => {
    const dotIndex = opt.indexOf('.');
    if (dotIndex === -1) return { prefix: '', text: opt };
    const prefix = opt.substring(0, dotIndex).trim();
    const text = opt.substring(dotIndex + 1).trim();
    return { prefix, text };
  };

  const progressPercent = ((currentIndex) / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      {/* Progress header bar */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2 text-xs font-semibold text-text-muted tracking-wider font-mono">
          <span>Question {currentIndex + 1} of {total}</span>
          <span>{Math.round(progressPercent)}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-border-subtle/30">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>
      
      {/* Question Card Panel */}
      <div className="glass-panel rounded-2xl p-6 md:p-10 shadow-sm bg-white/40 border border-border-subtle/30">
        <h3 className="font-display text-2xl md:text-3xl leading-snug text-text-primary mb-8 text-center">
          {question.question}
        </h3>

        <div className="flex flex-col gap-3 mb-8">
          {question.options.map((opt, i) => {
            const { prefix, text } = getOptionParts(opt);
            const isSelected = selected === prefix;
            const isCorrect = prefix === question.answer;
            
            let btnClass = 'glass-button w-full text-left rounded-xl p-5 flex items-center group relative overflow-hidden transition-all duration-300 ';
            let prefixClass = 'w-8 h-8 rounded-full border flex items-center justify-center mr-4 flex-shrink-0 transition-colors ';
            let textClass = 'font-body text-base md:text-lg transition-colors ';

            if (!isRevealed) {
              if (isSelected) {
                btnClass += 'selected border-accent bg-accent/5 shadow-sm';
                prefixClass += 'border-accent text-accent bg-accent/10 font-bold';
                textClass += 'text-text-primary font-medium';
              } else {
                btnClass += 'border-border-default/60 hover:bg-hover';
                prefixClass += 'border-border-default text-text-muted group-hover:border-accent/40 group-hover:text-accent font-bold';
                textClass += 'text-text-secondary group-hover:text-text-primary';
              }
            } else {
              // Answer is revealed
              if (isCorrect) {
                btnClass += 'correct selected bg-success/5 border-success';
                prefixClass += 'border-success bg-success/10 text-success';
                textClass += 'text-text-primary font-semibold';
              } else if (isSelected && !isCorrect) {
                btnClass += 'incorrect selected bg-error/5 border-error line-through text-text-muted';
                prefixClass += 'border-error bg-error/10 text-error';
                textClass += 'text-text-muted';
              } else {
                btnClass += 'opacity-40 cursor-not-allowed border-border-default/40';
                prefixClass += 'border-border-default/40 text-text-muted/40';
                textClass += 'text-text-muted/40';
              }
            }

            return (
              <button
                key={i}
                disabled={isRevealed}
                onClick={() => setSelected(prefix)}
                className={btnClass}
              >
                {/* Left side accent indicator border */}
                {isRevealed && isCorrect && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-l-xl" />
                )}
                {isRevealed && isSelected && !isCorrect && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-error rounded-l-xl" />
                )}

                {/* Option Letter Badge */}
                <div className={prefixClass}>
                  {isRevealed && isCorrect ? (
                    <Check className="w-4 h-4 text-success" strokeWidth={3} />
                  ) : isRevealed && isSelected && !isCorrect ? (
                    <X className="w-4 h-4 text-error" strokeWidth={3} />
                  ) : (
                    <span className="text-sm">{prefix}</span>
                  )}
                </div>

                {/* Option Text */}
                <span className={textClass}>{text}</span>
              </button>
            );
          })}
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-4">
          {!isRevealed ? (
            <Button 
              onClick={handleCheck} 
              disabled={!selected}
              className="w-full py-4 text-base font-semibold shadow-[0_2px_12px_rgba(194,101,42,0.1)] btn-shimmer"
            >
              Check Answer
            </Button>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent-dim/40 border border-accent-border/40 rounded-xl p-5 mb-2 text-sm text-text-primary shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2 text-accent font-semibold">
                  <Lightbulb className="w-4 h-4 text-accent2" />
                  <span>Explanation:</span>
                </div>
                <p className="leading-relaxed text-[14px] text-text-secondary">{question.explanation}</p>
              </motion.div>
              <Button 
                onClick={handleNext} 
                className="w-full py-4 text-base font-semibold shadow-[0_2px_12px_rgba(194,101,42,0.1)] btn-shimmer"
              >
                <span className="flex items-center justify-center gap-1.5">
                  {currentIndex < total - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};
