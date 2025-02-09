
import { useEffect, useRef } from "react";
import { TreePine, Leaf, Star, Heart, User, Briefcase, Book, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HabitTreeProps {
  totalHabits: number;
  completedHabits: number;
  streakCount: number;
}

const categoryColors = {
  Health: { from: "#F97316", to: "#FB923C", icon: Heart },
  Personal: { from: "#8B5CF6", to: "#A78BFA", icon: User },
  Work: { from: "#0EA5E9", to: "#38BDF8", icon: Briefcase },
  Learning: { from: "#22C55E", to: "#4ADE80", icon: Book },
  Spiritual: { from: "#EAB308", to: "#FDE047", icon: Compass },
};

export const HabitTree = ({ totalHabits, completedHabits, streakCount }: HabitTreeProps) => {
  const treeHeight = Math.min(100, (completedHabits / totalHabits) * 100);
  const leaves = Array.from({ length: Math.min(15, streakCount) });
  
  return (
    <div className="relative w-full h-96 flex items-end justify-center py-8">
      <div className="absolute bottom-0 w-full max-w-xs mx-auto">
        {/* Ground shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full" />
        
        {/* Tree trunk with texture */}
        <motion.div
          className="relative mx-auto w-6 bg-gradient-to-t from-[#8B5CF6] to-[#1EAEDB] rounded-full overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: `${treeHeight}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Trunk texture */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-4 border-t border-black/10"
                style={{ transform: `translateY(${i * 20}px)` }}
              />
            ))}
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>
        
        {/* Tree crown with enhanced glow */}
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative">
            <TreePine className="w-32 h-32 text-[#1EAEDB] drop-shadow-[0_0_10px_rgba(30,174,219,0.3)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#1EAEDB]/20 blur-xl" />
          </div>
        </motion.div>

        {/* Animated leaves with category colors */}
        <AnimatePresence>
          {leaves.map((_, index) => {
            const randomCategory = Object.values(categoryColors)[Math.floor(Math.random() * Object.keys(categoryColors).length)];
            const Icon = randomCategory.icon;
            
            return (
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
                style={{
                  filter: `drop-shadow(0 0 5px ${randomCategory.from})`
                }}
              >
                <Icon className="w-5 h-5" style={{ color: randomCategory.from }} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Glowing stars for additional detail */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute"
            initial={{ 
              opacity: 0,
              scale: 0,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300/50" />
          </motion.div>
        ))}

        {/* Progress indicators with enhanced styling */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <motion.p 
            className="text-white/80 mb-2 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Splněno {completedHabits} z {totalHabits} návyků
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <p className="text-yellow-400 text-lg">Série: {streakCount} dní</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
