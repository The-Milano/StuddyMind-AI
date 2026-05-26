import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getSessionById } from '../lib/api';
import { Spinner } from '../components/ui/Spinner';
import { QuizCard } from '../components/QuizCard';
import { ScoreScreen } from '../components/ScoreScreen';

export const QuizPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentSession, setCurrentSession } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSessionById(sessionId);
        setCurrentSession(data);
      } catch (error) {
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };
    if (!currentSession || currentSession.session_id !== sessionId) {
      fetchSession();
    } else {
      setIsLoading(false);
    }
  }, [sessionId, navigate, currentSession, setCurrentSession]);

  if (isLoading || !currentSession) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  const handleQuizNext = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    setQuizIndex(i => i + 1);
  };

  const handleQuizComplete = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    setQuizComplete(true);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-base p-4 md:p-8">
      <Link 
        to={`/results/${sessionId}`} 
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
      >
        <ArrowLeft size={18} /> Exit Quiz
      </Link>
      
      <div className="max-w-4xl mx-auto mt-12">
        {quizComplete ? (
          <ScoreScreen 
            score={score} 
            total={currentSession.quiz.length} 
            onRetry={resetQuiz}
            onBack={() => navigate(`/results/${sessionId}`)}
          />
        ) : (
          <QuizCard 
            question={currentSession.quiz[quizIndex]}
            total={currentSession.quiz.length}
            currentIndex={quizIndex}
            onNext={handleQuizNext}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
};
