import bookImg from '@/assets/images/Numerology_Book.png';
import { useReport } from '@/context/ReportContext';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
export default function LifePathDetail() {
  const { reportData } = useReport();
  const navigate = useNavigate();

  const details = reportData?.interpretations?.lifePath;
  const lifePathNumber = reportData?.coreNumbers?.lifePathNumber;

  // Specific strengths/challenges default arrays if not found
  const strengths = details?.strengths?.slice(0, 5) || [];
  const challenges = details?.challenges?.slice(0, 5) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">The Reveal</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
              Your Life Path Number
            </h2>

            {/* Glowing Circular Badge */}
            <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 text-white font-display font-black text-3xl flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(249,115,22,0.6)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
              <span className="relative z-10">{lifePathNumber}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Descriptions */}
      <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg relative overflow-hidden space-y-4 hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300" id="life-path-description">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <p className="font-bold text-indigo-950 dark:text-slate-100 text-lg leading-snug">{details?.subtitle}</p>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed font-medium">
          <p>{details?.description}</p>
        </div>
      </motion.div>

      {/* Strengths & Challenges Dual Columns */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">

        {/* Strengths Column */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <h3 className="text-emerald-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-6 h-1 bg-emerald-400 rounded-full"></span>
            Your Top Strengths
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {strengths?.map((str, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[13px] font-bold rounded-xl shadow-[0_4px_15px_-5px_rgba(16,185,129,0.4)] transition-transform hover:-translate-y-0.5"
              >
                {str}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="space-y-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300">
          <h3 className="text-rose-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-6 h-1 bg-rose-400 rounded-full"></span>
            Your Top Challenges
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {challenges?.map((ch, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[13px] font-bold rounded-xl shadow-[0_4px_15px_-5px_rgba(244,63,94,0.4)] transition-transform hover:-translate-y-0.5"
              >
                {ch}
              </span>
            ))}
          </div>
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
              Your Life Path is just the beginning! The complete premium report unlocks deep karmic insights and your ultimate cosmic potential.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] font-medium text-indigo-200">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Ideal Business Fields</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Future Predictions</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Spiritual Remedies</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#e3b659] shrink-0" /> Core Numbers Analysis</span>
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
          Click Next to uncover your Core Numbers—the master blueprint of your personality.
        </p>
      </motion.div>

    </motion.div>
  );
}
