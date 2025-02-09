
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
        {/* Ground shadow with hover effect */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full"
          whileHover={{ scale: 1.1, opacity: 0.3 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Interactive tree trunk with texture */}
        <motion.div
          className="relative mx-auto w-6 bg-gradient-to-t from-[#8B5CF6] to-[#1EAEDB] rounded-full overflow-hidden cursor-pointer"
          initial={{ height: 0 }}
          animate={{ height: `${treeHeight}%` }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced trunk texture with hover effect */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            whileHover={{ opacity: 0.3 }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-full h-4 border-t border-black/10"
                style={{ transform: `translateY(${i * 20}px)` }}
                whileHover={{ borderColor: "rgba(0,0,0,0.2)" }}
              />
            ))}
          </motion.div>
          
          {/* Enhanced glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"
            whileHover={{ opacity: 0.4 }}
          />
        </motion.div>
        
        {/* Interactive tree crown with enhanced glow */}
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, 2, -2, 0],
          }}
          transition={{ 
            duration: 0.5,
            rotate: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="relative">
            <TreePine className="w-32 h-32 text-[#1EAEDB] drop-shadow-[0_0_10px_rgba(30,174,219,0.3)]" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-transparent to-[#1EAEDB]/20 blur-xl"
              whileHover={{ opacity: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Enhanced animated leaves with category colors and hover effects */}
        <AnimatePresence>
          {leaves.map((_, index) => {
            const randomCategory = Object.values(categoryColors)[Math.floor(Math.random() * Object.keys(categoryColors).length)];
            const Icon = randomCategory.icon;
            
            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
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
                whileHover={{ 
                  scale: 1.3,
                  rotate: [0, 15, -15, 0],
                  filter: `drop-shadow(0 0 8px ${randomCategory.from})`,
                  transition: {
                    duration: 0.3,
                    rotate: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
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

        {/* Interactive glowing stars */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute cursor-pointer"
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
            whileHover={{ 
              scale: 1.5,
              opacity: 1,
              rotate: 180,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              whileHover: { duration: 0.3 }
            }}
          >
            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300/50" />
          </motion.div>
        ))}

        {/* Enhanced progress indicators */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <motion.p 
            className="text-white/80 mb-2 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.5 }}
          >
            Splněno {completedHabits} z {totalHabits} návyků
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
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

