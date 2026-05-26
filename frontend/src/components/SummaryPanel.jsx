import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy } from 'lucide-react';
import { Badge } from './ui/Badge';

export const SummaryPanel = ({ summary, wordCount }) => {
  const readTime = Math.ceil(wordCount / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 lg:p-8 shadow-sm animate-fade-in-up relative border border-border-subtle/30 bg-white/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Badge variant="default">{wordCount} words</Badge>
          <Badge variant="muted">~{readTime} min read</Badge>
        </div>
        <button 
          onClick={handleCopy}
          className="text-text-muted hover:text-accent transition-colors p-2 rounded hover:bg-hover"
          title="Copy Summary"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      
      {/* Replaced prose-invert with prose-sahara to fix contrast/invisibility issues */}
      <div className="prose-sahara max-w-none text-text-primary text-sm md:text-base leading-relaxed">
        <ReactMarkdown>{summary}</ReactMarkdown>
      </div>
    </div>
  );
};
