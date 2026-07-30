import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AstroCalculatingSlideProps {
  onComplete: () => void;
}

const loadingTexts = [
  'Analyzing Core Numbers...',
  'Calculating Life Path...',
  'Aligning Name Destiny...',
  'Mapping Birth Chart...',
  'Generating Final Report...'
];
import { useReport } from '@/context/ReportContext';

export default function AstroCalculatingSlide({ onComplete }: AstroCalculatingSlideProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const { isLoading } = useReport();

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (isLoading) {
        // Increment smoothly but increasingly slowly up to 95%
        if (current < 50) current += 1;
        else if (current < 80) current += 0.5;
        else if (current < 95) current += 0.5;
        else if (current < 99) current += 0.02; // Almost stopped at 99
      } else {
        // Once loading finishes, speed to 100%
        current += 5;
      }

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
      setProgress(Math.floor(current));

      // Update text index based on progress
      const newIndex = Math.min(Math.floor(current / 20), loadingTexts.length - 1);
      setTextIndex(newIndex);
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, isLoading]);

  // Numbers 1-9 for the mandala ring
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      className="min-h-screen w-full bg-[#05060A] flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Background mystical glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center z-10">

        {/* Sacred Geometry Mandala Animation */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">

          {/* Outer Dashed Ring (Gold) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-orange-400/30 border-dashed"
            style={{ borderWidth: '2px' }}
          />

          {/* Middle Ring with Numbers */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-indigo-500/20 flex items-center justify-center"
          >
            {numbers?.map((num, i) => {
              const angle = (i * 360) / 9;
              const radius = 108; // Distance from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <div
                  key={num}
                  className="absolute text-indigo-300/60 font-serif text-sm font-bold"
                  style={{ transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)` }}
                >
                  {num}
                </div>
              );
            })}
          </motion.div>

          {/* Inner Glowing Ring (Indigo) */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{
              rotate: { repeat: Infinity, duration: 15, ease: 'linear' },
              scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }}
            className="absolute inset-12 rounded-full border-2 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          />

          {/* Center Pulsing Core */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-indigo-500 shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#05060A] flex items-center justify-center">
              <span className="text-orange-400 font-serif text-2xl">
                {Math.floor((progress % 9) + 1)}
              </span>
            </div>
          </motion.div>

          {/* Connecting lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-[1px] bg-indigo-400 rotate-45" />
            <div className="w-full h-[1px] bg-indigo-400 -rotate-45" />
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-orange-300/90 font-serif text-lg tracking-wide"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>

        {/* Progress percentage */}
        <div className="mt-3 text-indigo-400/60 font-mono text-xs tracking-widest">
          {progress}%
        </div>

      </div>
    </div>
  );
}
