import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, File, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadZone = ({ onFileSelect, selectedFile, onClear }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  if (selectedFile) {
    return (
      <div className="bg-surface border border-border-default p-4 rounded-lg flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-3">
          <File className="text-accent" size={24} />
          <div>
            <p className="text-text-primary font-medium text-sm">{selectedFile.name}</p>
            <p className="text-text-muted text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="text-success" size={20} />
          <button onClick={onClear} className="text-text-muted hover:text-error transition-colors p-1">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`border-2 border-dashed rounded-xl min-h-[220px] flex flex-col items-center justify-center p-6 cursor-pointer transition-colors duration-150 ${isDragActive ? 'border-accent bg-accent-dim' : 'border-border-default bg-surface hover:border-accent hover:bg-accent-dim'}`}
    >
      <input {...getInputProps()} />
      <div className="bg-card p-4 rounded-full mb-4 shadow-sm">
        <FileUp className={isDragActive ? 'text-accent' : 'text-text-secondary'} size={32} />
      </div>
      <p className="text-text-primary font-semibold text-lg mb-1">Click to upload or drag and drop</p>
      <p className="text-text-muted text-sm text-center max-w-sm">
        Upload your lecture notes in PDF or .txt format (max 10MB).
      </p>
    </motion.div>
  );
};
