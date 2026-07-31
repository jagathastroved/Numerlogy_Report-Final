import bookImg from '@/assets/images/Numerology_Book.png';
import { ArrowRight, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NumerologyOverview() {
  const navigate = useNavigate();

  const preparedItems = [
    {
      title: "Analysis of Your Core Numbers",
      desc: "Unlock the hidden meanings behind your Destiny, Soul Urge, and Expression vibrations to understand your true self."
    },
    {
      title: "Your Life Path Number",
      desc: "Unveil your ultimate soul mission, innate talents, and the specific cosmic path you were born to fulfill."
    },
    {
      title: "Business Name Number",
      desc: "Determine the exact numerological frequency that will attract maximum wealth and success to your enterprise."
    },
    {
      title: "Suitable Business Fields",
      desc: "Pinpoint the ideal career trajectories and industries that perfectly match your energetic blueprint."
    },
    {
      title: "Mobile Number Selection Guide",
      desc: "Discover the secret to picking a phone number that acts as a magnet for prosperity, luck, and powerful connections."
    },
    {
      title: "Vehicle Number Selection",
      desc: "Guarantee safety, smooth journeys, and constant good fortune by selecting an auspicious license plate."
    },
    {
      title: "Your Future Predictions",
      desc: "Receive highly accurate, customized forecasts and strategic cosmic advice for the upcoming years."
    },
    {
      title: "Favorable Calendar Dates",
      desc: "Identify your absolute luckiest days of the month to sign contracts, travel, or make life-altering choices."
    },
    {
      title: "Temples to Visit",
      desc: "Access powerful spiritual remedies and specific sacred locations tailored to balance your unique energies."
    }
  ];
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
      <motion.div variants={itemVariants} className="relative flex flex-col xl:flex-row items-center xl:items-start justify-between gap-6">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center xl:items-start text-center xl:text-left flex-1 relative z-10 order-1 xl:order-1 mt-2 xl:mt-0 gap-4">
          <div className="order-1 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-700">Your Personal Numerology Report Is Here</span>
          </div>

          <h2 className="order-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-slate-100 pb-1">
            Here We Have Prepared Your In-Depth Personalized Numerology Report
          </h2>

          <div className="order-3 xl:hidden flex justify-center items-center shrink-0 relative z-10 w-48 sm:w-56 animate-float cursor-pointer group py-2">
            <img
              src={bookImg}
              alt="Numerology Report"
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Cover book (Desktop) */}
        <div className="hidden xl:flex justify-center items-center shrink-0 relative z-10 order-2 w-44 animate-float cursor-pointer group">
          <img
            src={bookImg}
            alt="Numerology Report"
            className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </motion.div>

      {/* Heading checklist description */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-indigo-100 dark:before:bg-slate-700 after:h-px after:flex-1 after:bg-indigo-100 dark:after:bg-slate-700">
          <p className="text-xs text-indigo-900/60 dark:text-indigo-200/60 font-bold tracking-widest uppercase text-center shrink-0">
            What You'll Find Inside
          </p>
        </div>

        {/* Checklist Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {preparedItems?.map((item, idx) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={idx}
              className="flex items-start gap-4 p-5 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 hover:border-indigo-200 dark:hover:border-slate-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Check circle */}
              <div className="relative z-10 w-10 h-10 rounded-xl bg-indigo-100/80 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-colors duration-300 shadow-sm border border-indigo-200/50 dark:border-indigo-500/30">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-[15px] font-bold text-indigo-950 dark:text-slate-100 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonial Card */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 rounded-[2rem] space-y-4 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700"></div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg border border-orange-300/50 shrink-0">
            AS
          </div>
          <div className="shrink-0">
            <h4 className="text-sm font-bold text-white tracking-wide">Anjali</h4>
            <p className="text-[10px] sm:text-xs text-indigo-200/80 uppercase tracking-widest font-bold mt-0.5">Verified User</p>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 ml-auto bg-black/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/5 shrink-0">
            {[1, 2, 3, 4, 5]?.map((s) => (
              <Star key={s} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
            ))}
          </div>
        </div>

        <p className="text-sm sm:text-[15px] text-indigo-100/90 italic leading-relaxed relative z-10 font-medium">
          "This numerology report completely blew me away. It broke down complex cosmic concepts into simple, actionable advice. The personalized remedies have brought so much clarity and peace to my daily life. I can't recommend this enough!"
        </p>
      </motion.div>

      {/* Direct Checkout Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <a
          href='https://www.astroved.com/prediction-services-personalized-numerology-report-P88425.aspx/?promo=SL_Numerology_Report'
          className="w-full py-4 sm:py-5 px-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 active:scale-[0.98] text-white font-bold rounded-2xl shadow-[0_10px_30px_-10px_rgba(244,63,94,0.6)] transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
          <span className="relative z-10 tracking-wide text-center leading-tight">Book Your Numerology Report</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
        </a>
      </motion.div>

    </motion.div>
  );
}
