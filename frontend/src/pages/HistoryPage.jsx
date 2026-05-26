import React, { useEffect, useState } from 'react';
import { getSessions, deleteSession } from '../lib/api';
import { SessionCard } from '../components/SessionCard';
import { Spinner } from '../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FolderOpen } from 'lucide-react';

export const HistoryPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const data = await getSessions();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(sessionId);
        setSessions(s => s.filter(x => x.session_id !== sessionId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Your Sessions</h1>
        <p className="text-text-muted">{sessions.length} sessions saved</p>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-border-default rounded-xl">
          <FolderOpen size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">No sessions yet</h2>
          <p className="text-text-secondary mb-6 max-w-sm mx-auto">
            Upload your first document to generate summaries, quizzes, and chat interactions.
          </p>
          <Link to="/upload">
            <Button>Upload your first document &rarr;</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <SessionCard 
              key={session.session_id} 
              session={session} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
