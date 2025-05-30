import React from 'react';
import { motion } from 'framer-motion';

type SkeletonLoaderProps = {
  className?: string;
  animate?: boolean;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  animate = true 
}) => {
  return (
    <motion.div
      className={`bg-gray-800 rounded-md ${className}`}
      initial={animate ? { opacity: 0.5 } : undefined}
      animate={animate ? { opacity: [0.5, 0.8, 0.5] } : undefined}
      transition={animate ? { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "easeInOut" 
      } : undefined}
    />
  );
};

export default SkeletonLoader;