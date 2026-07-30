import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { useReport } from '@/context/ReportContext';

export default function CoreNumbers() {
  const { reportData } = useReport();

  // Safe defaults if the coreNumbers are not yet fully populated
  const coreNumbers = reportData?.coreNumbers || {
    birthNumber: 7,
    nameNumber: 4,
    destinyNumber: 2,
  };

  // Handle both fresh data and old cached data in sessionStorage
  const birthNumber = (coreNumbers as any).birthNumber ?? (coreNumbers as any).destiny ?? 7;
  const nameNumber = (coreNumbers as any).nameNumber ?? (coreNumbers as any).name ?? 4;
  const destinyNumber = (coreNumbers as any).destinyNumber ?? (coreNumbers as any).lifePath ?? 2;

  // Configuration for each core number card to give them unique, vibrant gradients
  const cardConfig = [
    { key: 'birthNumber', val: birthNumber, label: "Birth Number", desc: (coreNumbers as any).birthNumberContent || "Your Birth Number reveals your fundamental character traits, hidden talents, and the innate potential you were born with. It highlights your natural disposition and the core energy you project into the world.", grad: 'from-orange-400 to-rose-500', shadow: 'hover:shadow-[0_8px_30px_-10px_rgba(244,63,94,0.3)]' },
    { key: 'destinyNumber', val: destinyNumber, label: "Destiny-Life Path Number", desc: (coreNumbers as any).destinyNumberContent || "The Destiny-Life Path Number is the most critical vibration in your chart. It points you toward your true soul's purpose, the primary karmic lessons you must learn, and the ultimate path you are destined to walk.", grad: 'from-violet-500 to-purple-600', shadow: 'hover:shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)]' },
    { key: 'nameNumber', val: nameNumber, label: "Name Destiny Number", desc: (coreNumbers as any).nameNumberContent || "Your Name Destiny Number acts as a powerful vibrational magnet. It influences the types of opportunities you attract, your professional success, and how you are perceived by others in society.", grad: 'from-amber-400 to-orange-500', shadow: 'hover:shadow-[0_8px_30px_-10px_rgba(245,158,11,0.3)]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pt-2"
    >

      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">Your Cosmic Blueprint</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
            Your Foundational Core Numbers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            Your core numbers are the foundation of your numerology profile. Each number reveals a unique aspect of your personality, strengths, talents, and life purpose. Together, they provide a deeper understanding of who you are, the opportunities you may encounter, and the path that can lead to personal growth and success.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium"> Explore the insights below to discover what your core numbers reveal about you.</p>
        </div>
      </div>

      {/* Core Numbers List */}
      <div className="grid grid-cols-1 gap-6 relative z-10">
        {cardConfig.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
            className={`flex flex-col bg-white/60 dark:bg-slate-700/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60 dark:border-slate-600 transition-all duration-300 hover:scale-[1.02] cursor-default group hover:bg-white/80 dark:hover:bg-slate-700/80 hover:shadow-xl hover:border-transparent ${card.shadow}`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-600 pb-4 mb-4">
              <span className="font-bold text-slate-800 dark:text-slate-100 text-base leading-snug transition-colors pr-2">{card.label}</span>
              <div className={`w-12 h-12 shrink-0 bg-gradient-to-br ${card.grad} rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                {card.val}
              </div>
            </div>
            <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Minimal Callout Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-5 sm:p-6 bg-indigo-50/60 dark:bg-slate-700/60 backdrop-blur-md border border-indigo-100/60 dark:border-slate-600 rounded-2xl shadow-md mt-8 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-slate-600 shadow-sm">
          <Compass className="w-6 h-6 text-indigo-600 animate-spin" style={{ animationDuration: '30s' }} />
        </div>

        <p className="text-indigo-950 dark:text-slate-100 font-medium text-base leading-relaxed text-center sm:text-left text-sm sm:text-base">
          Ready to explore further? Click Next to decode your Name Destiny number.
        </p>
      </motion.div>

    </motion.div>
  );
}
