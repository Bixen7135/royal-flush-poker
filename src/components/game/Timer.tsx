import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onTimeUp,
  isActive,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, isActive, onTimeUp]);

  const progress = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative flex items-center gap-2 ${className}`}
    >
      <Clock className={`w-5 h-5 ${isWarning ? 'text-red-400' : 'text-accent-400'}`} />
      <div className="relative w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${
            isWarning ? 'bg-red-400' : 'bg-accent-400'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className={`font-mono text-sm ${
        isWarning ? 'text-red-400' : 'text-accent-400'
      }`}>
        {timeLeft}s
      </span>
    </motion.div>
  );
};

export default Timer; 