import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadZone } from '../components/UploadZone';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { uploadDocument } from '../lib/api';

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError('');
    setStatusMsg('Extracting text...');
    
    // Simulate rotating status messages
    const statuses = ['Extracting text...', 'Generating summary...', 'Creating quiz...'];
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setStatusMsg(statuses[statusIndex]);
    }, 2000);

    try {
      const data = await uploadDocument(file);
      clearInterval(statusInterval);
      navigate(`/results/${data.session_id}`);
    } catch (err) {
      clearInterval(statusInterval);
      setError(err.response?.data?.detail || err.message || 'An error occurred during upload.');
      setIsUploading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in-up">
        <h1 className="font-display text-3xl font-bold mb-2">Upload your document</h1>
        <p className="text-text-secondary mb-8">PDF or plain text, up to 10MB</p>

        <UploadZone 
          selectedFile={file} 
          onFileSelect={setFile} 
          onClear={() => setFile(null)} 
        />

        {error && (
          <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
            {error}
          </div>
        )}

        <div className="mt-8">
          <Button 
            className="w-full py-4 text-lg" 
            disabled={!file || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" />
                <span className="animate-pulse">{statusMsg}</span>
              </span>
            ) : (
              'Analyze with AI'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
