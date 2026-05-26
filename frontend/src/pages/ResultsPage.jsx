import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Target, 
  MessageSquare, 
  Download, 
  Upload as UploadIcon, 
  Calendar, 
  Menu, 
  X, 
  HelpCircle, 
  History as HistoryIcon, 
  GraduationCap 
} from 'lucide-react';
import { getSessionById } from '../lib/api';
import { useAppStore } from '../store/useAppStore';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { SummaryPanel } from '../components/SummaryPanel';
import { QuizCard } from '../components/QuizCard';
import { ChatInterface } from '../components/ChatInterface';
import { ScoreScreen } from '../components/ScoreScreen';

export const ResultsPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentSession, setCurrentSession } = useAppStore();
  const [activeTab, setActiveTab] = useState('summary');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Quiz state
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
    fetchSession();
  }, [sessionId, navigate, setCurrentSession]);

  if (isLoading || !currentSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([currentSession.summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentSession.filename}_summary.txt`;
    document.body.appendChild(element);
    element.click();
  };

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

  const dateStr = new Date(currentSession.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const menuItems = [
    { id: 'summary', icon: FileText, label: 'Summary' },
    { id: 'quiz', icon: Target, label: 'Quiz' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' }
  ];

  return (
    <div className="flex h-screen overflow-hidden relative font-body text-text-primary bg-transparent">
      {/* Aurora Background Blobs */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>

      {/* Side Navigation - Desktop */}
      <nav className="hidden md:flex flex-col h-screen w-64 bg-white/10 backdrop-blur-[32px] border-r border-white/15 py-6 z-30 shrink-0">
        {/* Brand */}
        <div className="px-6 mb-2">
          <Link to="/" className="hover:opacity-85 transition-opacity">
            <h1 className="font-display text-2xl font-bold text-accent tracking-tight">StudyMind AI</h1>
          </Link>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">Premium Assistant</p>
        </div>

        {/* File Snippet Card */}
        <div className="mx-4 my-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-[0_2px_12px_rgba(58,48,42,0.02)]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-accent-dim flex items-center justify-center shrink-0">
              <FileText className="text-accent w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-semibold text-text-primary truncate" title={currentSession.filename}>
                {currentSession.filename}
              </h2>
              <p className="text-xs text-text-muted mt-0.5 truncate">{currentSession.word_count} words</p>
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="flex-1 px-2 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-accent/10 border border-accent-border/50 text-accent font-semibold shadow-sm' 
                  : 'text-text-secondary hover:bg-hover hover:text-text-primary border border-transparent'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
          <Link
            to="/upload"
            className="rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:bg-hover hover:text-text-primary border border-transparent transition-all"
          >
            <UploadIcon className="w-4 h-4 shrink-0" />
            <span>New Document</span>
          </Link>
        </div>

        {/* Bottom items */}
        <div className="mt-auto px-2 pt-4 border-t border-border-subtle/30 space-y-1">
          <div className="px-4 pb-4">
            <button 
              onClick={handleExport}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium text-xs py-2.5 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 btn-shimmer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Summary
            </button>
          </div>
          <Link
            to="/history"
            className="rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:bg-hover hover:text-text-primary transition-all"
          >
            <HistoryIcon className="w-4 h-4 shrink-0" />
            <span>History Log</span>
          </Link>
          <a
            href="#"
            className="rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:bg-hover hover:text-text-primary transition-all"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Help</span>
          </a>
        </div>
      </nav>

      {/* Side Navigation - Mobile (Overlay drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            {/* Sidebar drawer */}
            <motion.nav 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border-subtle p-6 z-50 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Link to="/" className="hover:opacity-85 transition-opacity">
                    <h1 className="font-display text-xl font-bold text-accent">StudyMind</h1>
                  </Link>
                  <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-0.5">Premium Assistant</p>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-text-secondary hover:text-text-primary hover:bg-hover rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document name snippet */}
              <div className="mb-6 p-4 bg-white/60 rounded-xl border border-border-subtle/50 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="text-accent w-5 h-5 shrink-0" />
                  <div className="overflow-hidden">
                    <h2 className="text-xs font-semibold text-text-primary truncate">{currentSession.filename}</h2>
                    <p className="text-[10px] text-text-muted mt-0.5 truncate">{dateStr}</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex-grow space-y-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-accent/10 text-accent font-semibold border border-accent-border/50' 
                        : 'text-text-secondary hover:bg-hover hover:text-text-primary'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <Link
                  to="/upload"
                  className="rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:bg-hover hover:text-text-primary"
                >
                  <UploadIcon className="w-4 h-4 shrink-0" />
                  <span>New Document</span>
                </Link>
              </div>

              {/* Bottom links */}
              <div className="mt-auto border-t border-border-subtle/30 pt-4 space-y-1">
                <button 
                  onClick={handleExport}
                  className="w-full bg-accent text-white font-medium text-xs py-2.5 rounded-lg mb-2 shadow-md flex items-center justify-center gap-1.5 btn-shimmer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Summary
                </button>
                <Link
                  to="/history"
                  className="rounded-lg flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:bg-hover hover:text-text-primary"
                >
                  <HistoryIcon className="w-4 h-4 shrink-0" />
                  <span>History Log</span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto md:overflow-hidden">
        {/* Mobile Header bar */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-border-subtle/50 bg-white/60 backdrop-blur-md z-20 shrink-0">
          <Link to="/" className="font-display text-xl font-bold text-accent hover:opacity-85 transition-opacity">
            StudyMind
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-hover rounded-full transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Aurora Background Texture */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none z-0" />

        {/* Content Container */}
        <div className="flex-grow flex flex-col p-6 md:p-8 lg:p-12 relative z-10 overflow-y-auto h-[calc(100vh-73px)] md:h-full">
          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-text-muted tracking-wider uppercase mb-6">
            <span>Documents</span>
            <span className="w-1 h-1 rounded-full bg-border-strong/60" />
            <span className="truncate max-w-[200px]" title={currentSession.filename}>{currentSession.filename}</span>
            <span className="w-1 h-1 rounded-full bg-border-strong/60" />
            <span className="text-accent">{activeTab}</span>
          </div>

          {/* Canvas Title block */}
          {activeTab === 'summary' && (
            <div className="mb-8">
              <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono block mb-1">
                Document Summary
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Synthesized Key Insights
              </h1>
            </div>
          )}
          {activeTab === 'quiz' && (
            <div className="mb-8">
              <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono block mb-1">
                Knowledge Retention
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Practice Assessment
              </h1>
            </div>
          )}
          {activeTab === 'chat' && (
            <div className="mb-8">
              <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono block mb-1">
                Interactive Assistant
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Document Chat
              </h1>
            </div>
          )}

          {/* Active Panel Content */}
          <div className="flex-1 min-h-0">
            {activeTab === 'summary' && (
              <div className="h-full overflow-y-auto pr-1">
                <SummaryPanel summary={currentSession.summary} wordCount={currentSession.word_count} />
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div className="h-full overflow-y-auto pr-1">
                {quizComplete ? (
                  <ScoreScreen 
                    score={score} 
                    total={currentSession.quiz.length} 
                    onRetry={resetQuiz}
                    onBack={() => setActiveTab('summary')}
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
            )}
            
            {activeTab === 'chat' && (
              <div className="h-full">
                <ChatInterface 
                  sessionId={sessionId} 
                  initialHistory={currentSession.chatHistory || []} 
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
