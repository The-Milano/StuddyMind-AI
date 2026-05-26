import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-surface border border-border-default rounded-lg px-4 py-3 shadow-lg"
        >
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
