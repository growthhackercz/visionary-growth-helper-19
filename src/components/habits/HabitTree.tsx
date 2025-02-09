
import { useEffect, useRef } from "react";
import { TreePine, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HabitTreeProps {
  totalHabits: number;
  completedHabits: number;
  streakCount: number;
}

export const HabitTree = ({ totalHabits, completedHabits, streakCount }: HabitTreeProps) => {
  const treeHeight = Math.min(100, (completedHabits / totalHabits) * 100);
  const leaves = Array.from({ length: Math.min(10, streakCount) });
  
  return (
    <div className="relative w-full h-96 flex items-end justify-center py-8">
      <div className="absolute bottom-0 w-full max-w-xs mx-auto">
        {/* Tree trunk */}
        <motion.div
          className="mx-auto w-4 bg-gradient-to-t from-[#8B5CF6] to-[#1EAEDB]"
          initial={{ height: 0 }}
          animate={{ height: `${treeHeight}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Tree crown */}
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <TreePine className="w-24 h-24 text-[#1EAEDB]" />
        </motion.div>

        {/* Animated leaves */}
        <AnimatePresence>
          {leaves.map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ 
                opacity: 0, 
                scale: 0,
                left: `${Math.random() * 100}%`,
                bottom: `${20 + Math.random() * 60}%`
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 10, -10, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Leaf className="w-4 h-4 text-green-400" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/80 mb-1">Splněno {completedHabits} z {totalHabits} návyků</p>
          <p className="text-purple-400">Série: {streakCount} dní</p>
        </div>
      </div>
    </div>
  );
};
