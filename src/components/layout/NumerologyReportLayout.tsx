import { useState, useEffect, useRef } from 'react';
import { useReport } from '../../context/ReportContext';
import { useTheme } from '../../context/ThemeContext';
import {
  ArrowLeft, ArrowRight, BookOpen, Compass, RefreshCw, PanelLeftClose, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Navigate, useLocation, Outlet } from 'react-router-dom';
import CelestialBackground from '../animations/CelestialBackground';
import MaintenanceError from '../ui/MaintenanceError';
import DownloadPdfButton from '../ui/DownloadPdfButton';

// Import slides for PDF Generation
import Welcome from '../../slides/Welcome';
import CoreNumbers from '../../slides/CoreNumbers';
import LifePathMath from '../../slides/LifePathMath';
import LifePathDetail from '../../slides/LifePathDetail';
import NameDestinyMath from '../../slides/NameDestinyMath';
import NumerologyOverview from '../../slides/NumerologyOverview';
import LuckyTraits from '../../slides/LuckyTraits';
import MonthForecast from '../../slides/MonthForecast';
import PremiumDeliverables from '../../slides/PremiumDeliverables';

const REPORT_PAGES = [
  { path: '/welcome', title: 'Welcome' },
  { path: '/life-path-math', title: 'Life Path Math' },
  { path: '/life-path-detail', title: 'Life Path Detail' },
  { path: '/core-numbers', title: 'Core Numbers' },
  { path: '/name-destiny-math', title: 'Name Destiny Math' },
  { path: '/numerology-overview', title: 'Numerology Overview' },
  { path: '/lucky-traits', title: 'Lucky Traits' },
  { path: '/month-forecast', title: 'Month Forecast' },
  { path: '/premium-deliverables', title: 'Premium Deliverables' }
];
export default function NumerologyReportLayout() {
  const { reportData, hasError } = useReport();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = REPORT_PAGES.findIndex(p => p.path === location.pathname);
  // If route is not found in report pages (shouldn't happen if nested correctly, but fallback to 0)
  const activeIndex = currentPage >= 0 ? currentPage : 0;

  const setPage = (idx: number) => {
    navigate(REPORT_PAGES[idx].path);
  };
  const nextPage = () => {
    if (activeIndex < REPORT_PAGES.length - 1) navigate(REPORT_PAGES[activeIndex + 1].path);
  };
  const prevPage = () => {
    if (activeIndex > 0) navigate(REPORT_PAGES[activeIndex - 1].path);
  };

  const handleResetReport = () => {
    navigate('/');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  if (hasError) {
    return <MaintenanceError onRetry={handleResetReport} />;
  }

  if (!reportData) return <Navigate to="/" replace />;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const el = document.getElementById('report-page-scroller');
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sidebarListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarListRef.current) return;
    const container = sidebarListRef.current;
    const activeBtn = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

    if (activeBtn) {
      const containerHeight = container.clientHeight;
      const btnTop = activeBtn.offsetTop;
      const btnHeight = activeBtn.clientHeight;
      const scrollTarget = btnTop - containerHeight / 2 + btnHeight / 2;
      container.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  }, [activeIndex]);

  useEffect(() => {
    // Timeout to ensure content has rendered and animation started
    const timer = setTimeout(() => {
      handleScrollToTop();
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden relative w-full">
      <CelestialBackground />

      {/* Mobile Drawer Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Modern Collapsible Table of Contents Navigation Drawer */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 h-[100dvh] z-50 lg:z-20 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen
          ? 'translate-x-0 w-[85vw] sm:w-80 shadow-[20px_0_40px_rgba(0,0,0,0.15)] lg:shadow-none lg:w-80 opacity-100'
          : '-translate-x-full lg:translate-x-0 w-[85vw] sm:w-80 lg:w-0 lg:opacity-0 lg:overflow-hidden'
          }`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/30">
              <BookOpen className="text-white" size={16} />
            </div>
            <span className="font-extrabold text-xs uppercase tracking-[0.15em] text-slate-800 dark:text-slate-100">
              Report Index
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Theme Toggle for Mobile inside Sidebar */}
            <button
              onClick={() => {
                toggleTheme();
                setIsSidebarOpen(false);
              }}
              className="lg:hidden flex items-center w-16 h-8 bg-slate-200 border border-slate-300 dark:bg-slate-700/80 dark:border-slate-600 rounded-full shadow-inner p-0.5 transition-colors relative"
              title="Toggle Theme"
            >
              <div className="w-full flex justify-between items-center px-1.5">
                <Moon size={14} className="text-indigo-400 dark:text-indigo-300" />
                <Sun size={14} className="text-amber-500 dark:text-amber-300" />
              </div>
              <motion.div
                className="absolute left-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                animate={{ x: theme === 'dark' ? 0 : 32 }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {theme === 'dark' ? (
                  <Moon size={12} className="text-indigo-600" />
                ) : (
                  <Sun size={12} className="text-amber-500" />
                )}
              </motion.div>
            </button>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors block"
              title="Collapse Sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable checklist items */}
        <div ref={sidebarListRef} className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 custom-scrollbar bg-slate-50/50 dark:bg-slate-800">
          {REPORT_PAGES?.map((page, idx) => {
            const isActive = idx === activeIndex;
            const isCompleted = idx < activeIndex;
            return (
              <button
                key={idx}
                data-index={idx}
                onClick={() => {
                  setPage(idx);
                  handleScrollToTop();
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`relative w-full flex items-center px-4 py-3 rounded-xl text-left text-[13px] font-bold transition-colors duration-300 group z-0 ${isActive
                  ? 'text-orange-900 dark:text-orange-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveBackground"
                    className="absolute inset-0 bg-white dark:bg-slate-700 border border-orange-200 dark:border-orange-500/30 shadow-sm rounded-xl -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 w-7 h-7 rounded-full mr-3 text-[11px] flex items-center justify-center font-black transition-colors duration-300 ${isActive
                  ? 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 shadow-sm'
                  : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 border border-emerald-100 dark:border-emerald-800/50'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                  }`}>
                  {idx + 1}
                </div>
                <span className="relative z-10 flex-1 truncate tracking-wide">{page.title}</span>
                {idx === REPORT_PAGES.length - 1 && (
                  <span className={`relative z-10 px-2 py-0.5 rounded text-[9px] uppercase font-black tracking-widest ml-2 transition-colors ${isActive ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200'
                    }`}>
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Exit booklet back to start form */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col justify-center space-y-3">
          <DownloadPdfButton
            targetIds={[
              'pdf-page-0', 'pdf-page-1', 'pdf-page-2', 'pdf-page-3',
              'pdf-page-4', 'pdf-page-5', 'pdf-page-6', 'pdf-page-7', 'pdf-page-8'
            ]}
          />
          <button
            onClick={handleResetReport}
            className="group relative flex items-center justify-center space-x-2 w-full px-2 sm:px-4 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(244,63,94,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(244,63,94,0.7)] transition-all duration-300 focus:outline-none overflow-hidden active:scale-[0.98] border border-white/10"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 -translate-x-[150%]"></div>
            <RefreshCw size={14} className="relative z-10 transition-transform duration-500 group-hover:rotate-180 flex-shrink-0" />
            <span className="relative z-10 text-[9px] sm:text-[11px] font-extrabold tracking-wide sm:tracking-[0.15em] uppercase drop-shadow-sm whitespace-nowrap">
              Enter Different Details
            </span>
          </button>
        </div>
      </aside>

      {/* Main Booklet container view */}
      <main className="flex-1 flex flex-col h-[100dvh] lg:h-[100dvh] overflow-hidden relative w-full">
        {/* Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="hidden lg:flex absolute top-6 right-6 lg:top-8 lg:right-8 z-50 items-center w-20 h-10 bg-slate-200 lg:bg-white/10 backdrop-blur-md border border-slate-300 lg:border-white/20 dark:bg-slate-700/80 dark:border-slate-600 rounded-full shadow-lg p-1 transition-colors duration-300 hover:bg-slate-300 lg:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 lg:focus:ring-white/30"
          title="Toggle Theme"
        >
          <div className="w-full flex justify-between items-center px-1.5">
            <Moon size={16} className="text-indigo-400 lg:text-indigo-200 dark:text-indigo-300" />
            <Sun size={16} className="text-amber-500 lg:text-amber-300 dark:text-amber-300" />
          </div>
          <motion.div
            className="absolute left-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
            animate={{ x: theme === 'dark' ? 0 : 40 }}
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {theme === 'dark' ? (
              <Moon size={16} className="text-indigo-600" />
            ) : (
              <Sun size={16} className="text-amber-500" />
            )}
          </motion.div>
        </button>

        {/* Floating Show Index Button when Sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-30 p-2 px-3 bg-[#6868F9] hover:bg-[#5c5ce0] text-white text-xs font-normal rounded-lg transition-colors flex items-center shadow-lg shadow-[#6868F9]/30"
          >
            <BookOpen size={13} className="mr-1.5" />
            <span>Show Index</span>
          </button>
        )}

        {/* Outer PDF Page Body Grid */}
        <section
          id="report-page-scroller"
          className="flex-1 overflow-y-auto px-4 lg:px-12 py-8 flex items-start justify-center custom-scrollbar w-full"
        >
          {/* Virtual Booklet Frame centering - SOLID WHITE THEME */}
          <div id="report-content-to-download" className="w-full max-w-2xl bg-[#FFFFFF] dark:bg-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl lg:rounded-[2rem] flex flex-col p-6 lg:p-10 relative select-text text-slate-900 dark:text-slate-100 overflow-hidden border border-slate-100 dark:border-slate-700 mx-auto">

            {/* Dynamic Header Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-[#ff8c4a] rounded-r-full shadow-[0_0_10px_rgba(244,116,46,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + 1) / REPORT_PAGES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <div className="block mt-2 min-w-0">
              {/* Header inside the booklet page */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-700 relative">
                {/* Left Logo */}
                <div className="flex-1 flex justify-start">
                  <img
                    src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
                    alt="Astroved-logo"
                    className="h-6 sm:h-8 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      navigate('/welcome');
                      handleScrollToTop();
                    }}
                  />
                </div>

                {/* Center Section Title */}
                <div className="flex-[2] sm:flex-none flex flex-col items-center justify-center text-center px-2">
                  <div className="flex items-center mb-1 text-orange-500 opacity-80">
                    <div className="hidden sm:block w-6 h-px bg-gradient-to-r from-transparent to-orange-500 mr-2"></div>
                    <Compass size={14} className="animate-spin-slow" />
                    <div className="hidden sm:block w-6 h-px bg-gradient-to-l from-transparent to-orange-500 ml-2"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-slate-800 dark:text-slate-200 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center break-words">
                    {REPORT_PAGES[activeIndex].title}
                  </span>
                </div>

                {/* Right Balance Placeholder */}
                <div className="flex-1"></div>
              </div>

              {/* Render Page Contents on index */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-sm lg:text-base font-normal selection:bg-indigo-100 dark:selection:bg-indigo-900/50 selection:text-indigo-900 dark:selection:text-indigo-100"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Book Navigator Buttons */}
            <footer className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center relative z-20">
              <button
                onClick={() => {
                  prevPage();
                  handleScrollToTop();
                }}
                disabled={activeIndex === 0}
                className="flex items-center justify-center px-4 py-3 rounded-2xl bg-indigo-50/80 dark:bg-slate-700 border border-indigo-100/50 dark:border-slate-600 hover:bg-indigo-100 dark:hover:bg-slate-600 hover:border-indigo-200 dark:hover:border-slate-500 text-indigo-900 dark:text-slate-200 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm group"
              >
                <ArrowLeft size={14} className="mr-1.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back</span>
              </button>

              {activeIndex < REPORT_PAGES.length - 1 && (
                <button
                  onClick={() => {
                    nextPage();
                    handleScrollToTop();
                  }}
                  className="flex items-center px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-xs font-black shadow-[0_8px_25px_-8px_rgba(249,115,22,0.6)] tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
                  <span className="relative z-10">Next</span>
                  <ArrowRight size={14} className="ml-1.5 relative z-10 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </footer>

          </div>
        </section>
      </main>

      {/* Hidden Container for PDF Generation - Contains all 9 pages */}
      <div className="pdf-export-container absolute left-[-9999px] top-0 w-[800px] bg-white h-[1px] overflow-visible">
        {[
          { Component: Welcome, title: 'Welcome' },
          { Component: LifePathMath, title: 'Life Path Math' },
          { Component: LifePathDetail, title: 'Life Path Detail' },
          { Component: CoreNumbers, title: 'Core Numbers' },
          { Component: NameDestinyMath, title: 'Name Destiny Math' },
          { Component: NumerologyOverview, title: 'Numerology Overview' },
          { Component: LuckyTraits, title: 'Lucky Traits' },
          { Component: MonthForecast, title: 'Month Forecast' },
          { Component: PremiumDeliverables, title: 'Premium Deliverables' },
        ].map((Page, index) => (
          <div key={index} id={`pdf-page-${index}`} className="w-full bg-[#FFFFFF] p-10 select-text text-slate-900 border border-slate-100 mb-8" style={{ minHeight: '1122px' }}>
            {/* Header inside the booklet page */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 relative">
              <div className="flex-1 flex justify-start">
                <img src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg" alt="Astroved-logo" className="h-8 w-auto object-contain" />
              </div>
              <div className="flex-[2] sm:flex-none flex flex-col items-center justify-center text-center px-2">
                <div className="flex items-center mb-1 text-orange-500 opacity-80">
                  <div className="w-6 h-px bg-gradient-to-r from-transparent to-orange-500 mr-2"></div>
                  <Compass size={14} className="animate-spin-slow" />
                  <div className="w-6 h-px bg-gradient-to-l from-transparent to-orange-500 ml-2"></div>
                </div>
                <span className="text-xs font-black text-slate-800 tracking-[0.2em] uppercase text-center break-words">
                  {Page.title}
                </span>
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="space-y-6 text-slate-800 leading-relaxed text-base font-normal">
              <Page.Component />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
