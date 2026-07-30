import { motion } from 'motion/react';
import { Hourglass } from 'lucide-react';

interface MaintenanceErrorProps {
  onRetry?: () => void;
}

export default function MaintenanceError({ onRetry }: MaintenanceErrorProps) {
  // Create an array of random stars for the background
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#0A0514]">
      {/* Deep Space Background with Nebulas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        
        {/* Twinkling Stars Background */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)'
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Card (matching the image) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-[460px] w-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] flex flex-col items-center text-center"
      >
        {/* Inner glow on top edge of the card */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-indigo-400/30 blur-xl rounded-full" />
        
        {/* Intricate Centerpiece (Astrological Hourglass) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 flex items-center justify-center">
          
          {/* Orbital arcs (ellipses representing planetary orbits) */}
          <div className="absolute inset-[-10%] border border-indigo-200/10 rounded-full rotate-45 transform scale-y-[0.4]" />
          <div className="absolute inset-[-10%] border border-purple-200/10 rounded-full -rotate-45 transform scale-y-[0.4]" />

          {/* Outer glowing dashed ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-indigo-300/30 border-dashed"
            style={{ borderWidth: '2px' }}
          />
          
          {/* Middle solid ring with glowing planets */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-purple-300/20"
          >
            {/* Small glowing planets on the orbit */}
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-cyan-200 rounded-full shadow-[0_0_12px_#67e8f9]" />
            <div className="absolute -bottom-1.5 left-[30%] w-2 h-2 bg-purple-300 rounded-full shadow-[0_0_10px_#c084fc]" />
            <div className="absolute top-[40%] -right-1.5 w-4 h-4 bg-amber-200 rounded-full shadow-[0_0_15px_#fde047]" />
          </motion.div>

          {/* Inner ring with astrological symbols */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-10 rounded-full border border-blue-200/10 flex items-center justify-center"
          >
            <span className="absolute -top-3 text-[10px] text-amber-200/60 font-serif">♈</span>
            <span className="absolute -bottom-3 text-[10px] text-cyan-200/60 font-serif">♎</span>
            <span className="absolute -left-3 text-[10px] text-purple-200/60 font-serif">♋</span>
            <span className="absolute -right-3 text-[10px] text-indigo-200/60 font-serif">♑</span>
            <span className="absolute top-[15%] right-[15%] text-[10px] text-pink-200/60 font-serif">♊</span>
            <span className="absolute bottom-[15%] left-[15%] text-[10px] text-emerald-200/60 font-serif">♏</span>
          </motion.div>

          {/* Core Hourglass */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            {/* Core background glow */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <motion.div
              animate={{ rotate: [0, 180, 180, 360, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.5, 0.9, 1] }}
              className="relative text-cyan-100 drop-shadow-[0_0_15px_rgba(103,232,249,0.8)]"
            >
              <Hourglass size={48} strokeWidth={1} />
            </motion.div>
          </div>
        </div>

        {/* Text Section */}
        <h1 className="font-serif text-2xl md:text-[26px] text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-100/80 font-normal mb-4 tracking-[0.1em] md:tracking-[0.15em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Under Maintenance
        </h1>
        
        <p className="text-indigo-100/70 text-xs md:text-sm leading-relaxed mb-6 font-light max-w-sm px-2">
          Our celestial patterns are aligning. We are currently performing maintenance to ensure the stars are in perfect sync for your journey. Please try again soon.
        </p>

        <h3 className="text-white/90 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
          Please Try Again Later
        </h3>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(103,232,249,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-6 py-3.5 max-w-[200px] mx-auto rounded-full border border-cyan-300/40 bg-cyan-900/20 text-cyan-100 text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(103,232,249,0.15)] transition-all flex-1"
          >
            Refresh Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
