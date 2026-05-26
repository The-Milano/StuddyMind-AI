import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold">StudyMind AI</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
          <span>Built with Gemini API</span>
        </div>
      </div>
    </footer>
  );
};
