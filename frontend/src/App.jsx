import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { ResultsPage } from './pages/ResultsPage';
import { QuizPage } from './pages/QuizPage';
import { HistoryPage } from './pages/HistoryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<><Navbar /><UploadPage /><Footer /></>} />
          <Route path="/history" element={<><Navbar /><HistoryPage /><Footer /></>} />
          <Route path="/results/:sessionId" element={<ResultsPage />} />
          <Route path="/results/:sessionId/quiz" element={<QuizPage />} />
          <Route path="*" element={<><Navbar /><NotFoundPage /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
