import bookImg from "@/assets/images/Numerology_Book.png";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles, Lock, FileText } from "lucide-react";
import { useReport } from "@/context/ReportContext";
export default function PremiumDeliverables() {
  const { reportData } = useReport();
  const name = reportData?.personalDetails?.fullName;
  const [loading, setLoading] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    symbol: "₹",
    price: "499.00",
    strikeout: "999.00",
    savings: "500.00",
  });
  useEffect(() => {
    const fetchPricing = async () => {
      const { getUserCountryCode, getCurrencyInfo } =
        await import("@/lib/timezoneCurrency");
      const countryCode = getUserCountryCode();
      const currencyInfo = getCurrencyInfo(countryCode);
      const currency = currencyInfo.currencyCode.toUpperCase();
      if (currency === "MYR") {
        setPriceDetails({
          symbol: "MYR",
          price: "50.00",
          strikeout: "100.00",
          savings: "50.00",
        });
      } else if (currency === "USD" || currency === "US") {
        setPriceDetails({
          symbol: "$",
          price: "15.00",
          strikeout: "30.00",
          savings: "15.00",
        });
      } else {
        setPriceDetails({
          symbol: "₹",
          price: "499.00",
          strikeout: "999.00",
          savings: "500.00",
        });
      }
    };
    fetchPricing();
  }, []);
  const currentPrice = priceDetails.price;
  const currentSymbol = priceDetails.symbol;
  const strikeoutPrice = priceDetails.strikeout;
  const savings = priceDetails.savings;
  const specialFeatures = [
    {
      title: "Analysis of Your Core Numbers",
      desc: "Unlock the hidden meanings behind your Destiny, Soul Urge, and Expression vibrations to understand your true self.",
    },
    {
      title: "Business Name Number",
      desc: "Determine the exact numerological frequency that will attract maximum wealth and success to your enterprise.",
    },
    {
      title: "Suitable Business Fields",
      desc: "Pinpoint the ideal career trajectories and industries that perfectly match your energetic blueprint.",
    },
    {
      title: "Mobile Number Selection Guide",
      desc: "Discover the secret to picking a phone number that acts as a magnet for prosperity, luck, and powerful connections.",
    },
    {
      title: "Vehicle Number Selection",
      desc: "Guarantee safety, smooth journeys, and constant good fortune by selecting an auspicious license plate.",
    },
    {
      title: "Your Future Predictions",
      desc: "Receive highly accurate, customized forecasts and strategic cosmic advice for the upcoming years.",
    },
    {
      title: "Favorable Calendar Dates",
      desc: "Identify your absolute luckiest days of the month to sign contracts, travel, or make life-altering choices.",
    },
    {
      title: "Temples to Visit",
      desc: "Access powerful spiritual remedies and specific sacred locations tailored to balance your unique energies.",
    },
  ];
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.open(
      "https://www.astroved.com/prediction-services-personalized-numerology-report-P88425.aspx/?promo=SL_Numerology_Report",
      "_blank"
    );
    setTimeout(() => setLoading(false), 1000);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pt-2 pb-2"
    >
      {/* Cover logo illustration and brief */}
      <motion.div
        variants={itemVariants}
        className="relative flex flex-col xl:flex-row items-center xl:items-start gap-8"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300/30 blur-3xl rounded-full pointer-events-none"></div>
        {/* Cover book (Desktop) */}
        <div className="hidden xl:flex justify-center items-center shrink-0 relative z-10 order-1 w-44 animate-float-straight cursor-pointer group">
          <img
            src={bookImg}
            alt="Numerology Report"
            className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Content Block */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left flex-1 z-10 order-2 gap-4">
          {/* Label */}
          <div className="order-1 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700">
              Premium Numerology Report
            </span>
          </div>
          {/* Title */}
          <h2 className="order-2 font-display text-2xl sm:text-4xl font-extrabold text-indigo-950 dark:text-slate-100 tracking-tight leading-snug">
            Numerology Report For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 capitalize">
              {name || "Seeker"}
            </span>
          </h2>
          {/* Cover book (Mobile) */}
          <div className="order-3 xl:hidden flex justify-center items-center shrink-0 relative z-10 w-48 sm:w-56 animate-float-straight cursor-pointer group py-2">
            <img
              src={bookImg}
              alt="Numerology Report"
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* Description */}
          <p className="order-4 text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-medium">
            We have successfully analyzed your birth data and computed your
            numbers. Everything you need to understand your life's purpose and
            make lucky choices is waiting for you.
          </p>
        </div>
      </motion.div>
      {/* Special Feature Points */}
      <motion.div variants={itemVariants} className="space-y-5 pt-4">
        <h3 className="font-bold text-xl text-indigo-950 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          What's Included In Your Report
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {specialFeatures?.map((feat, idx) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={idx}
              className="flex items-start gap-4 p-5 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/60 dark:border-slate-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 hover:border-indigo-200 dark:hover:border-slate-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-10 h-10 rounded-xl bg-indigo-100/80 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-colors duration-300 shadow-sm border border-indigo-200/50 dark:border-indigo-500/30">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-[15px] font-bold text-indigo-950 dark:text-slate-100 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Interactive checkout section */}
      <motion.div variants={itemVariants}>
        <div className="space-y-6 pt-4">
          {/* Pricing Box layout */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400 rounded-xl p-4 sm:p-5 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.4)] flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex flex-col relative z-10 items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
              <span className="text-[11px] font-black text-emerald-100 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3 h-3 shrink-0" />
                <span>Total Order Price</span>
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-2 sm:gap-3 flex-wrap">
                <span className="text-emerald-200 line-through text-lg sm:text-xl font-bold decoration-emerald-400/50 decoration-2 whitespace-nowrap">
                  {currentSymbol} {strikeoutPrice}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md whitespace-nowrap">
                  {currentSymbol} {currentPrice}
                </span>
              </div>
            </div>
            {/* Discount Badge */}
            <div className="bg-white text-emerald-700 font-black uppercase px-4 py-2 rounded-lg shadow-md relative z-10 flex flex-col items-center border border-white/50 text-center shrink-0 w-full sm:w-auto">
              <span className="text-[10px] tracking-wide whitespace-nowrap">
                You Save: {currentSymbol} {savings} (50%)
              </span>
            </div>
          </div>
          {/* CTA action button */}
          <a
            href="https://www.astroved.com/prediction-services-personalized-numerology-report-P88425.aspx/?promo=SL_Numerology_Report"
            target="_blank"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-black text-sm sm:text-lg tracking-wide rounded-xl shadow-[0_8px_20px_-10px_rgba(244,63,94,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group border border-orange-400/50"
          >
            <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white relative z-10" />
                <span className="relative z-10">Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:scale-110" />
                <span className="relative z-10">
                  Unlock Complete Report for {currentSymbol} {currentPrice}
                </span>
              </>
            )}
          </a>

          {/* View Sample Report Button */}
          <a
            href="https://www.astroved.com/reacthome/reports/Sample%20Numerology%20Report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-4 bg-white/50 hover:bg-white text-indigo-600 font-bold text-sm sm:text-base tracking-wide rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all duration-300 flex items-center justify-center gap-2 mt-3"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            View Sample Report
          </a>

          <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 100% Secure Checkout
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
