import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { useReport } from '@/context/ReportContext';

/**
 * Reduce a number to a single digit (1-9) or a Master Number (11, 22, 33)
 */
function reduceToNumerologyDigit(num: number): number {
  let current = num;
  while (current > 9) {
    let sum = 0;
    while (current > 0) {
      sum += current % 10;
      current = Math.floor(current / 10);
    }
    current = sum;
  }
  return current;
}

// Helper to generate the string of math steps for a given number
function getReductionSteps(num: number): string[] {
  const steps: string[] = [];
  let current = num;

  while (current > 9) {
    const digits = current.toString().split('')?.map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    steps.push(`${digits.join(' + ')} = ${sum}`);
    current = sum;
  }
  return steps;
}

export default function LifePathMath() {
  const { reportData } = useReport();

  // Dynamic accurate calculations based on actual user input
  const birthDay = reportData?.personalDetails?.birthDay || "10";
  const birthMonth = reportData?.personalDetails?.birthMonth || "10";
  const birthYear = reportData?.personalDetails?.birthYear || "2002";

  const dayVal = parseInt(birthDay, 10) || 10;
  const monthVal = parseInt(birthMonth, 10) || 10;
  const yearVal = parseInt(birthYear, 10) || 2002;

  const dayReduced = reduceToNumerologyDigit(dayVal);
  const monthReduced = reduceToNumerologyDigit(monthVal);
  const yearReduced = reduceToNumerologyDigit(yearVal);

  const rawSum = dayReduced + monthReduced + yearReduced;

  // Fetch lifePath from the API data if available, otherwise fallback to frontend computation
  const lifePathFinal = reportData?.coreNumbers?.lifePathNumber ?? reduceToNumerologyDigit(rawSum);

  const daySteps = getReductionSteps(dayVal);
  const monthSteps = getReductionSteps(monthVal);
  const yearSteps = getReductionSteps(yearVal);

  // Dynamically generate the math steps from rawSum down to the fetched API lifePathFinal
  const finalSteps: string[] = [];
  let currentRaw = rawSum;
  while (currentRaw > 9 && currentRaw !== lifePathFinal) {
    const digits = currentRaw.toString().split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    finalSteps.push(`${digits.join(' + ')} = ${sum}`);
    currentRaw = sum;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
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
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">The Formula</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
            Decoding Your Life Path
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            Your Life Path Number is the most profound indicator of your character and the trajectory of your lifetime. We derive this powerful digit by systematically reducing your birth date until it reveals your foundational vibration or a rare Master Number.
          </p>
        </div>
      </motion.div>

      {/* Input Pills Block */}
      <motion.div variants={itemVariants} className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 p-6 rounded-[2rem] shadow-lg relative overflow-hidden group hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <p className="text-slate-500 dark:text-slate-400 font-bold text-xs text-center uppercase tracking-widest">
          Your Exact Date of Birth
        </p>

        <div className="flex justify-center gap-3 sm:gap-6">
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[90px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Day</span>
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md font-bold w-full aspect-[4/3] flex items-center justify-center rounded-2xl text-lg sm:text-xl shrink-0">{dayVal}</div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[90px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Month</span>
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md font-bold w-full aspect-[4/3] flex items-center justify-center rounded-2xl text-lg sm:text-xl shrink-0">{monthVal}</div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[90px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Year</span>
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md font-bold w-full aspect-[4/3] flex items-center justify-center rounded-2xl text-lg sm:text-xl shrink-0">{yearVal}</div>
          </div>
        </div>
      </motion.div>

      {/* Math Reduction Block */}
      <motion.div variants={itemVariants} className="space-y-6">

        {/* Step 1 */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <p className="text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-600 pb-3 font-medium">
            <strong className="text-violet-600 dark:text-violet-400 font-bold mr-1">Phase 1:</strong> Reduce the day, month, and year down to single digits.
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200 font-mono bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <span className="w-12 text-slate-400 dark:text-slate-400 font-sans font-bold text-xs uppercase mt-1">Day:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{dayVal > 9 ? daySteps?.map((step, idx) => <span key={idx}>{idx > 0 && <span className="text-violet-400 mx-1">→</span>}{step}</span>) : dayVal}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-12 text-slate-400 dark:text-slate-400 font-sans font-bold text-xs uppercase mt-1">Month:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{monthVal > 9 ? monthSteps?.map((step, idx) => <span key={idx}>{idx > 0 && <span className="text-violet-400 mx-1">→</span>}{step}</span>) : monthVal}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-12 text-slate-400 dark:text-slate-400 font-sans font-bold text-xs uppercase mt-1">Year:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 leading-relaxed">{yearVal > 9 ? yearSteps?.map((step, idx) => <span key={idx}>{idx > 0 && <span className="text-violet-400 mx-1">→</span>}{step}</span>) : yearVal}</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <p className="text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-600 pb-3 font-medium">
            <strong className="text-orange-500 font-bold mr-1">Phase 2:</strong> Sum the reduced values together.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 font-mono text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="bg-white dark:bg-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-600 font-bold shadow-sm text-indigo-900 dark:text-indigo-100 shrink-0 text-center min-w-[2.5rem]">{dayReduced}</span>
            <span className="text-slate-900 dark:text-slate-100 shrink-0">+</span>
            <span className="bg-white dark:bg-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-600 font-bold shadow-sm text-indigo-900 dark:text-indigo-100 shrink-0 text-center min-w-[2.5rem]">{monthReduced}</span>
            <span className="text-slate-900 dark:text-slate-100 shrink-0">+</span>
            <span className="bg-white dark:bg-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-600 font-bold shadow-sm text-indigo-900 dark:text-indigo-100 shrink-0 text-center min-w-[2.5rem]">{yearReduced}</span>
            <span className="text-slate-900 dark:text-slate-100 shrink-0">=</span>
            <span className="bg-gradient-to-r from-orange-100 to-rose-100 text-rose-700 font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-rose-200 shadow-sm shrink-0 min-w-[2.5rem] text-center">{rawSum}</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-5 pt-4 text-center flex flex-col items-center">
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            <strong className="text-rose-500 font-bold mr-1">Phase 3:</strong> Reduce the final sum to unveil your single-digit path.
          </p>

          {finalSteps.length > 0 && (
            <div className="text-sm text-slate-700 dark:text-slate-200 font-mono bg-white dark:bg-slate-800 px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm font-bold">
              {finalSteps?.map((step, idx) => <span key={idx}>{idx > 0 && <span className="text-rose-400 mx-2">→</span>}{step}</span>)}
            </div>
          )}

          {/* Giant Circular Output */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 mt-4 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center font-sans font-black text-6xl leading-none text-white shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] relative cursor-default"
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-full"></div>
            <span className="relative z-10 translate-y-1">{lifePathFinal}</span>
          </motion.div>

          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mt-4">
            Your Core Life Path Number
          </p>
        </div>
      </motion.div>

      {/* Minimal Callout Box */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-5 sm:p-6 bg-indigo-50/60 dark:bg-slate-700/60 backdrop-blur-md border border-indigo-100/60 dark:border-slate-600 rounded-2xl shadow-md mt-8 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-slate-600 shadow-sm">
          <Compass className="w-6 h-6 text-indigo-600 animate-spin" style={{ animationDuration: '30s' }} />
        </div>

        <p className="text-indigo-950 dark:text-slate-100 font-medium text-base leading-relaxed text-center sm:text-left text-sm sm:text-base">
          Let's dig deeper! Click Next to discover what your Life Path reveals about your greatest advantages and karmic lessons.
        </p>
      </motion.div>

    </motion.div>
  );
}
