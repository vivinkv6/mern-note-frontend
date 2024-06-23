import React from 'react';
import { motion } from 'framer-motion';

const Skeleton: React.FC = () => {
  return (
    <div className="p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded bg-gray-300 h-36 w-full"></div>
      </div>
      <div className="pt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="pt-4 flex justify-between">
        <motion.div 
          className="h-8 bg-gray-300 rounded w-24" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}>
        </motion.div>
        <motion.div 
          className="h-8 bg-gray-300 rounded w-24" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}>
        </motion.div>
      </div>
    </div>
  );
}

export default Skeleton;
