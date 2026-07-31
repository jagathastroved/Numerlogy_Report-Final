import bookImg from '@/assets/images/Numerology_Book.png';
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

import { useReport } from '@/context/ReportContext';
import { useNavigate } from 'react-router-dom';
const CHALDEAN_VALUE: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
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

export default function NameDestinyMath() {
  const navigate = useNavigate();
  const { reportData } = useReport();
  const fullName = reportData?.personalDetails?.fullName;

  const cleanedName = (fullName || '').toUpperCase().replace(/[^A-Z]/g, '');
  const characters = cleanedName.split('');

  // Calculate letter values
  const values = characters?.map(char => CHALDEAN_VALUE[char] || 1);
  const sum = values.reduce((acc, val) => acc + val, 0);

  // Prioritize the API's fetched Name Number
  const finalDestiny = reportData?.coreNumbers?.nameNumber || reduceToNumerologyDigit(sum);

  // Reduction explanation generation
  let reductionPath = String(sum);
  if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    const digits = String(sum).split('')?.map(Number);
    const firstSum = digits.reduce((a, b) => a + b, 0);
    reductionPath += ` → ${digits.join(' + ')} = ${firstSum}`;

    if (firstSum > 9 && firstSum !== 11 && firstSum !== 22 && firstSum !== 33) {
      const secondDigits = String(firstSum).split('')?.map(Number);
      const secondSum = secondDigits.reduce((a, b) => a + b, 0);
      reductionPath += ` → ${secondDigits.join(' + ')} = ${secondSum}`;
    }
  }

  const interpretation = reportData?.interpretations?.destiny?.desc
    ? reportData.interpretations.destiny
    : { title: "Your Destiny", desc: "Your destiny is a path of continuous growth and harmony." };

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
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">Name Math</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
            Your Name Destiny Number
          </h2>
          <div className="space-y-2 text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            <p>Your Name Destiny Number, frequently known as your Minor Expression Number, is derived from the exact name you use on a daily basis. This could be a nickname, your professional title, or a new surname taken after marriage.</p>
            <p>This powerful number dictates the distinct energetic frequency you project into the universe. It acts as your "vibrational signature," influencing your daily interactions, professional opportunities, and how others perceive you.</p>
          </div>
        </div>
      </motion.div>

      {/* Full Name letter pills */}
      <motion.div variants={itemVariants} className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 p-6 rounded-[2rem] shadow-lg relative overflow-hidden group hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <p className="text-slate-500 dark:text-slate-400 font-bold text-xs text-center uppercase tracking-widest">
          Your Current Full Name
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-3 relative z-10">
          {characters?.map((char, index) => (
            <React.Fragment key={index}>
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-700 dark:to-slate-800 text-indigo-900 dark:text-indigo-100 font-bold text-lg sm:text-xl flex items-center justify-center shadow-md border border-indigo-100/50 dark:border-slate-600 transition-transform hover:-translate-y-1 shrink-0">
                {char}
              </span>
              {index < characters.length - 1 && <span className="text-slate-900 dark:text-slate-100 font-medium text-xs sm:text-sm shrink-0">+</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Step-by-step reduction math */}
      <motion.div variants={itemVariants} className="space-y-6">

        {/* Step 1 */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <p className="text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-600 pb-3 font-medium">
            <strong className="text-violet-600 font-bold mr-1">Phase 1</strong> Assign the corresponding numerological value to every letter.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-3 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            {values?.map((v, index) => (
              <React.Fragment key={index}>
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-700 text-violet-700 dark:text-violet-300 font-black text-base sm:text-lg flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-600 transition-transform hover:-translate-y-1 shrink-0">
                  {v}
                </span>
                {index < values.length - 1 && <span className="text-slate-900 dark:text-slate-100 font-medium text-xs sm:text-sm shrink-0">+</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <p className="text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-600 pb-3 font-medium">
            <strong className="text-orange-500 font-bold mr-1">Phase 2</strong> Calculate the sum for your first, middle, and last names individually.
          </p>
          <div className="flex justify-center bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="bg-gradient-to-r from-orange-100 to-rose-100 text-rose-700 shadow-sm border border-rose-200 px-6 py-3 rounded-xl font-mono text-base font-bold tracking-wide">
              {reductionPath}
            </span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-5 pt-4 text-center flex flex-col items-center">
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            <strong className="text-rose-500 font-bold mr-1">Phase 3</strong> Continue reducing the sums until you arrive at a master or single digit.
          </p>

          {/* Giant Circular Output */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 mt-4 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center font-sans font-black text-6xl leading-none text-white shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] relative cursor-default"
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-full"></div>
            <span className="relative z-10 translate-y-1">{finalDestiny}</span>
          </motion.div>

          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mt-4">
            Your Name Vibration
          </p>
        </div>
      </motion.div>

      {/* Personality text description box */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 p-[3px] rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] relative overflow-hidden">
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[1.8rem] relative z-10">
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Your name number is <strong className="text-violet-600 dark:text-violet-400 font-black text-xl">{finalDestiny}</strong>. Every time you use this name, you give off the vibe of a "<span className="text-orange-500 font-bold">{interpretation.title}</span>".
            <br /><br />
            {interpretation.desc}
          </p>
        </div>
      </motion.div>

      {/* Super Premium Promotional Banner Box */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-br from-[#411b40] via-[#2d1b54] to-[#1a0b2e] p-6 lg:p-8 flex flex-col xl:flex-row flex-wrap items-center gap-6 lg:gap-8 group mt-6 border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-fuchsia-500/20 transition-colors duration-1000"></div>

        {/* Background Decorative Stars */}
        <div className="absolute top-4 left-1/3 text-yellow-500/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        </div>
        <div className="absolute top-8 right-8 text-pink-400/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        </div>

        {/* Premium Book Mockup (Desktop) */}
        <div className="hidden lg:flex relative z-10 shrink-0 w-44 lg:order-1 mx-auto animate-float cursor-pointer group items-center justify-center mb-4 lg:mb-0">
          <img src={bookImg} alt="Numerology Report" className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" />
        </div>

        {/* Text Content Block */}
        <div className="relative z-10 flex-1 flex flex-col items-center lg:items-start order-2 gap-4 w-full">

          <div className="order-1 inline-flex items-center gap-1.5 px-3 py-1 border border-[#c2964b] rounded-full">
            <svg className="w-3 h-3 text-[#e3b659]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
            <span className="text-[9px] font-bold text-[#e1b971] tracking-widest uppercase">GET YOUR PREMIUM NUMEROLOGY REPORT</span>
          </div>

          <h3 className="order-2 text-2xl lg:text-3xl font-bold text-white leading-tight text-center lg:text-left tracking-tight">
            Unlock Your Complete Numerological Destiny
          </h3>

          {/* Premium Book Mockup (Mobile) */}
          <div className="order-3 lg:hidden relative z-10 shrink-0 w-48 sm:w-56 mx-auto animate-float cursor-pointer group flex items-center justify-center py-2">
            <img src={bookImg} alt="Numerology Report" className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="order-4 w-full">
            <p className="text-sm text-indigo-100/90 leading-relaxed text-center lg:text-left mb-3">
              Your Name Destiny is just the beginning! The complete premium report unlocks the secrets of names and numbers that attract success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] font-medium text-indigo-200">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Business Name Frequency</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Mobile & Vehicle Numbers</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Future Predictions</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Lucky Dates & Temples</span>
            </div>
          </div>

          <a
            href='https://www.astroved.com/prediction-services-personalized-numerology-report-P88425.aspx/?promo=SL_Numerology_Report'
            className="order-5 hidden lg:flex mt-2 px-6 py-3 bg-gradient-to-r from-[#e3b659] to-[#c2964b] hover:from-[#f0c366] hover:to-[#d1a55a] text-[#2a1148] text-sm font-bold rounded-xl shadow-[0_4px_15px_rgba(227,182,89,0.3)] transition-all hover:scale-105 active:scale-95 items-center justify-center"
          >
            Book Your Numerology Report
          </a>
        </div>

        {/* Mobile Button - Order 3 (Bottom on Mobile) */}
        <div className="relative z-10 lg:hidden w-full order-3 mt-2">
          <a
            href='https://www.astroved.com/prediction-services-personalized-numerology-report-P88425.aspx/?promo=SL_Numerology_Report'
            className="w-full px-6 py-3.5 bg-gradient-to-r from-[#e3b659] to-[#c2964b] text-[#2a1148] text-sm font-bold rounded-xl shadow-[0_4px_15px_rgba(227,182,89,0.3)] active:scale-95 transition-transform flex items-center justify-center"
          >
            Book Your Numerology Report
          </a>
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
          Let's advance to your comprehensive Personalized Numerology Overview.
        </p>
      </motion.div>

    </motion.div>
  );
}
