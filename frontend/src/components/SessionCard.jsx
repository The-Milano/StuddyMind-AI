import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SessionCard = ({ session, onDelete }) => {
  const date = new Date(session.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Card interactive className="group relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-text-primary truncate pr-4">{session.filename}</h3>
        <span className="text-xs text-text-muted shrink-0">{date}</span>
      </div>
      
      <Badge variant="default" className="mb-4">{session.word_count} words</Badge>
      
      <p className="text-sm text-text-secondary line-clamp-2 mb-6">
        {session.summary_preview}
      </p>
      
      <div className="flex justify-between items-center mt-auto">
        <Link 
          to={`/results/${session.session_id}`}
          className="text-accent text-sm font-medium flex items-center gap-1 group-hover:underline"
        >
          Open Session <ArrowRight size={16} />
        </Link>
        
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(session.session_id); }}
          className="text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all p-2 rounded hover:bg-error/10"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Card>
  );
};
