import { Compass, Sparkles } from 'lucide-react';

import { useReport } from '@/context/ReportContext';
import { motion } from 'framer-motion';

const interpretationsMap: Record<number, { title: string, desc: string }> = {
  1: { title: "Fresh Starts & Bold Action", desc: "A Personal Month of 1 kicks off a dynamic cycle of new beginnings. Now is the exact moment to plant fresh seeds, launch new ventures, and assert your independence. Your leadership qualities are amplified—trust your gut and take decisive action." },
  2: { title: "Harmony & Diplomatic Patience", desc: "A Personal Month of 2 shifts the focus to partnerships and emotional balance. It is a period for nurturing the seeds you recently planted. Empathy, teamwork, and careful diplomacy will yield the best results. Lean into your relationships." },
  3: { title: "Creative Spark & Joyful Expression", desc: "A Personal Month of 3 is electric, social, and highly communicative. Your creative juices are overflowing, making it a stellar time for art, writing, or public speaking. Embrace joy, surround yourself with friends, and let your true self shine." },
  4: { title: "Discipline & Solid Foundations", desc: "A Personal Month of 4 demands hard work, structure, and practical planning. It is time to roll up your sleeves and fortify your future. Concentrate on administrative tasks, manage your details, and build a sturdy framework for success." },
  5: { title: "Dynamic Change & Liberation", desc: "A Personal Month of 5 ushers in adventure, unpredictability, and major shifts. Stay flexible and embrace the unknown. This is the ultimate time for travel, networking, and breaking free from stagnant routines. Expand your horizons." },
  6: { title: "Domestic Harmony & Responsibility", desc: "A Personal Month of 6 revolves around love, family, and home life. You may be called upon to support loved ones or heal strained relationships. It is a beautiful period for beautifying your sanctuary and finding peace at home." },
  7: { title: "Deep Introspection & Spiritual Awakening", desc: "A Personal Month of 7 invites you to step back from the chaos and journey inward. It is a profound period for meditation, research, and soul-searching. Listen closely to your inner voice and prioritize your spiritual and mental well-being." },
  8: { title: "Manifestation & Material Power", desc: "A Personal Month of 8 activates your career and financial sectors. Your ability to manifest wealth is at its peak. Step confidently into your power, make bold executive decisions, and watch your disciplined efforts translate into material rewards." },
  9: { title: "Culmination & Karmic Release", desc: "A Personal Month of 9 marks the end of a cycle. It is a time of deep reflection, closure, and releasing what no longer serves you. Declutter your life—both physically and emotionally—to clear the runway for your next great chapter." },
  11: { title: "Divine Intuition & Illumination", desc: "A Master Personal Month of 11 opens a powerful channel to higher consciousness. Your psychic sensitivity and intuition are amplified. Utilize this rare energy for spiritual teaching, profound inspiration, and elevating your vibration." },
  22: { title: "The Master Architect", desc: "A Master Personal Month of 22 presents a monumental opportunity to turn your most ambitious visions into tangible reality. By combining your high ideals with grounded, practical effort, you can achieve success on a massive scale." }
};

/**
 * Reduce a number to a single digit (1-9) or a Master Number (11, 22, 33)
 */
function reduceToNumerologyDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  let current = num;
  while (current > 9) {
    let sum = 0;
    while (current > 0) {
      sum += current % 10;
      current = Math.floor(current / 10);
    }
    current = sum;
    if (current === 11 || current === 22 || current === 33) return current;
  }
  return current;
}

export default function MonthForecast() {
  const { reportData } = useReport();
  const birthDay = reportData?.personalDetails?.birthDay || "10";
  const birthMonth = reportData?.personalDetails?.birthMonth || "10";

  // Dynamic accurate calculations
  const dayVal = parseInt(birthDay, 10) || 10;
  const monthVal = parseInt(birthMonth, 10) || 10;

  const dayReduced = reduceToNumerologyDigit(dayVal);
  const monthReduced = reduceToNumerologyDigit(monthVal);
  const currentYearReduced = reduceToNumerologyDigit(2026); // 2026 = 2+0+2+6 = 10 = 1

  // Personal Year = Birth Day + Birth Month + Current Year (reduced)
  const personalYear = reduceToNumerologyDigit(dayReduced + monthReduced + currentYearReduced);

  // June 2026: Month = 6
  const juneMonthVal = 6;
  const personalMonth = reduceToNumerologyDigit(personalYear + juneMonthVal);

  // Use API data if available, fallback to calculations
  const apiMonthNumber = reportData?.monthlyForecast?.monthForecastNumber;
  const apiMonthContent = reportData?.monthlyForecast?.monthForecastContent;

  const displayMonthNumber = apiMonthNumber !== undefined ? apiMonthNumber : personalMonth;

  const staticInterpretation = interpretationsMap[displayMonthNumber] || interpretationsMap[1];

  const interpretation = {
    title: staticInterpretation.title,
    desc: apiMonthContent || staticInterpretation.desc
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pt-2 pb-2"
    >

      {/* Header */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">Monthly Forecast</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
            Current Month Forecast
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            A detailed breakdown of the energetic forces shaping your current month
          </p>
        </div>
      </motion.div>

      {/* Giant Number Indicator badge */}
      <motion.div variants={itemVariants} className="flex flex-col items-center justify-center space-y-2 pt-2 pb-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-400/20 blur-3xl rounded-full pointer-events-none"></div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-36 h-36 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center font-black text-7xl leading-none text-white shadow-[0_15px_40px_-15px_rgba(249,115,22,0.6)] relative z-10 cursor-default"
        >
          <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-full"></div>
          <span className="relative z-10 translate-y-1">{displayMonthNumber}</span>
        </motion.div>

        <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase mt-6 relative z-10">
          Your Personal Monthly Cycle
        </p>
      </motion.div>

      {/* Interpretation Details */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-[2rem] blur opacity-30"></div>
        <div className="relative bg-white dark:bg-slate-800 border border-indigo-50 dark:border-slate-700 p-6 sm:p-8 rounded-[1.8rem] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] dark:shadow-none">
          <p className="font-bold text-indigo-950 dark:text-slate-100 text-xl sm:text-2xl tracking-tight mb-4">{interpretation.title}</p>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            {interpretation.desc}
          </p>
        </div>
      </motion.div>

      {/* Minimal Callout Box */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-5 sm:p-6 bg-indigo-50/50 dark:bg-slate-700/50 border border-indigo-100 dark:border-slate-600 rounded-2xl shadow-sm mt-8"
      >
        <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-slate-600 shadow-sm">
          <Compass className="w-6 h-6 text-indigo-600 animate-spin" style={{ animationDuration: '30s' }} />
        </div>

        <p className="text-indigo-950 dark:text-slate-100 font-medium text-base leading-relaxed text-center sm:text-left text-sm sm:text-base">
          That concludes your monthly preview. Now let's explore everything waiting for you in the full premium dossier.
        </p>
      </motion.div>

    </motion.div>
  );
}
