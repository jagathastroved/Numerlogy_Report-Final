import { motion } from 'framer-motion';
import { Sparkles, Star, Palette } from 'lucide-react';
import { useReport } from '@/context/ReportContext';

// Helper to determine if text should be white or black based on background color
const isDarkColor = (color: string) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    // Handle both 3-digit and 6-digit hex
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  // List of known dark color names
  const darkColors = ["black", "dark blue", "purple", "navy", "dark green", "maroon", "indigo", "dark red", "brown", "darkblue", "darkgreen", "darkred"];
  return darkColors.includes(color.toLowerCase().trim());
};

export default function LuckyTraits() {
  const { reportData } = useReport();

  const luckyTraits = reportData?.lucky_traits || { lucky_numbers: [], lucky_colors: [] };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-fuchsia-300/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-fuchsia-100 to-pink-100 border border-fuchsia-200 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-fuchsia-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-fuchsia-700">Cosmic Alignments</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 pb-1">
            Your Lucky Traits
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
            Unlock the energetic frequencies and colors that align perfectly with your cosmic blueprint.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-10">
        {/* ================= LUCKY NUMBERS ================= */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 shadow-lg rounded-[2rem] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80">

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 dark:from-emerald-500/10 to-transparent rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-50 dark:from-cyan-500/10 to-transparent rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-600 pb-5 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                <Star className="w-7 h-7 fill-emerald-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-2xl tracking-tight">Your Auspicious Numbers</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed font-medium mb-8 relative z-10 max-w-lg">
              These numbers resonate with your highest vibrational potential. Use them for important dates, financial decisions, and major life events.
            </p>

            <div className="flex flex-wrap gap-4 relative z-10">
              {luckyTraits.lucky_numbers?.map((num: number, index: number) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.08 + 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-[1.25rem] font-black text-2xl sm:text-3xl text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 cursor-default"
                >
                  <span className="relative z-10">{num}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= LUCKY COLORS ================= */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 shadow-lg rounded-[2rem] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80">

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 dark:from-blue-500/10 to-transparent rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-50 dark:from-indigo-500/10 to-transparent rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-600 pb-5 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-2xl tracking-tight">Your Power Colors</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed font-medium mb-8 relative z-10 max-w-lg">
              Wearing or surrounding yourself with these colors enhances your aura, attracts positive opportunities, and deflects negative energy.
            </p>

            <div className="flex flex-wrap gap-4 relative z-10">
              {luckyTraits.lucky_colors?.map((color: string, index: number) => {
                // Determine a valid CSS color dynamically
                let dynamicColor = color;

                if (!color.startsWith('#')) {
                  const normalized = color.toLowerCase().replace(/[\s-]+/g, '');
                  let isValid = false;

                  // Check if color is valid natively
                  if (typeof window !== 'undefined') {
                    const s = new Option().style;
                    s.color = normalized;
                    if (s.color !== '') {
                      dynamicColor = normalized;
                      isValid = true;
                    } else {
                      // Try to find a valid base color word (e.g. "pink" from "pastel pink")
                      const words = color.toLowerCase().split(/[\s-]+/);
                      for (const word of words) {
                        s.color = word;
                        if (s.color !== '') {
                          dynamicColor = word;
                          isValid = true;
                          break;
                        }
                      }
                    }
                  }

                  // If completely unknown, generate a consistent dynamic color based on string hash
                  if (!isValid && typeof window !== 'undefined') {
                    let hash = 0;
                    for (let i = 0; i < color.length; i++) {
                      hash = color.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    const h = Math.abs(hash) % 360;
                    // Saffron and Cream will fall back to dynamic deterministic HSL colors
                    dynamicColor = `hsl(${h}, 75%, 65%)`;
                  } else if (!isValid) {
                    dynamicColor = normalized; // Fallback for SSR
                  }
                }

                const formattedColor = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.1 + 0.4 }}
                    style={{
                      '--theme-color': dynamicColor,
                      borderColor: dynamicColor
                    } as React.CSSProperties}
                    className="relative px-6 py-4 flex items-center justify-center rounded-2xl font-bold text-sm sm:text-base border-2 cursor-default tracking-wide transition-all duration-300 overflow-hidden group/color shadow-md hover:shadow-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm"
                  >
                    {/* The Fill Background - Active by default, empties on hover */}
                    <div className="absolute inset-0 bg-[var(--theme-color)] transition-transform duration-500 ease-in-out origin-right scale-x-100 group-hover/color:scale-x-0"></div>

                    <span
                      className={`relative z-10 font-extrabold tracking-wider transition-colors duration-500 ${isDarkColor(dynamicColor) ? "text-white" : "text-black"} group-hover/color:text-[var(--theme-color)] group-hover/color:mix-blend-difference`}
                    >
                      {formattedColor}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
