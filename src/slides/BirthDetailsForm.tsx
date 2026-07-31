import { useState, useEffect } from 'react';
import { PersonalDetails } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Country, ICountry } from 'country-state-city';
import { useReport } from '@/context/ReportContext';
import { motion, AnimatePresence } from 'motion/react';
import CelestialBackground from '@/components/animations/CelestialBackground';
import CustomSelect from '@/components/ui/CustomSelect';
import { searchLocation } from '@/api/locationAPi';

interface BirthDetailsFormProps {
  data: PersonalDetails;
  language: string;
  setLanguage: (lang: string) => void;
  onChange: (updates: Partial<PersonalDetails>) => void;
}

const MONTHS = [
  { name: 'Jan', val: '1' },
  { name: 'Feb', val: '2' },
  { name: 'Mar', val: '3' },
  { name: 'Apr', val: '4' },
  { name: 'May', val: '5' },
  { name: 'Jun', val: '6' },
  { name: 'Jul', val: '7' },
  { name: 'Aug', val: '8' },
  { name: 'Sep', val: '9' },
  { name: 'Oct', val: '10' },
  { name: 'Nov', val: '11' },
  { name: 'Dec', val: '12' }
];

export default function BirthDetailsForm({
  data,
  onChange,
}: BirthDetailsFormProps) {
  const navigate = useNavigate();
  const { fetchReport } = useReport();
  const [activeTab, setActiveTab] = useState<'Numerology'>('Numerology');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [apiCities, setApiCities] = useState<{ name: string, displayName: string, stateName?: string, lat?: number, lng?: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isValidCity, setIsValidCity] = useState(false);

  useEffect(() => {
    if (!data.birthCountry || data.birthCountry === 'IN') { // Default was IN previously, or empty
      const initCountry = async () => {
        const { getUserCountryCode } = await import('@/lib/timezoneCurrency');
        const defaultCountry = getUserCountryCode();
        if (!data.birthCountry || data.birthCountry !== defaultCountry) {
          onChange({ birthCountry: defaultCountry });
        }
      };
      initCountry();
    }
  }, []);

  useEffect(() => {
    const city = (data.birthCity || '').trim();
    const countryCode = (data.birthCountry || '').trim();

    if (!countryCode || !city || city.length < 3) {
      setApiCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const country = Country.getCountryByCode(countryCode)?.name || countryCode;
        const results = await searchLocation(city, country);

        if (!results || results.length === 0) {
          setApiCities([]);
          return;
        }

        const formattedCities = results.map((item: any) => ({
          name: item.City || item.name || item.display_name?.split(',')[0],
          displayName: item.City
            ? `${item.City}, ${item.StateorProvince ? item.StateorProvince + ', ' : ''}${item.Country}`
            : item.display_name,
          stateName: item.StateorProvince || 'Unknown',
          lat: item.Latitude ? parseFloat(item.Latitude) : 0,
          lng: item.Longitude ? parseFloat(item.Longitude) : 0
        }));

        const uniqueCities = Array.from(new Map(formattedCities.map((item: any) => [item.displayName, item])).values()) as { name: string, displayName: string, stateName: string, lat: number, lng: number }[];
        setApiCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data.birthCity, data.birthCountry]);

  // Dynamic Calendar Validation
  const maxDays = data.birthMonth
    ? new Date(data.birthYear ? Number(data.birthYear) : 2024, Number(data.birthMonth), 0).getDate()
    : 31;
  const days = Array.from({ length: maxDays }, (_, i) => String(i + 1));

  useEffect(() => {
    if (data.birthDay && Number(data.birthDay) > maxDays) {
      onChange({ birthDay: String(maxDays) });
    }
  }, [maxDays]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => String(currentYear - i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.gender) {
      alert("Please select your gender.");
      return;
    }
    if (data.birthCountry && (!data.birthCity || !isValidCity)) {
      alert("Please select a valid city from the suggested list.");
      return;
    }
    fetchReport(data);

    // Clear form fields
    onChange({
      fullName: '',
      email: '',
      gender: '',
      birthDay: '1',
      birthMonth: '1',
      birthYear: '2000',
      birthHour: '12',
      birthMinute: '00',
      birthSecond: '00',
      birthCountry: 'IN',
      birthCity: '',
      latitude: '',
      longitude: ''
    });

    navigate('/calculating');
  };

  return (
    <div
      className="min-h-[100dvh] lg:h-[100dvh] w-full flex items-center justify-center p-4 lg:p-8 relative overflow-x-hidden overflow-y-auto lg:overflow-hidden"
    >
      <div className="fixed inset-0 z-0 bg-[#0B0F19]">
        <CelestialBackground />
      </div>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center relative z-10 py-6 md:py-8 lg:py-12">

        {/* Left Side Text */}
        <div className="text-white space-y-5 lg:space-y-7 flex flex-col items-center md:items-start w-full">
          <h1 className="text-3xl md:text-2xl lg:text-5xl font-normal leading-tight text-white drop-shadow-md font-serif text-center md:text-left">
            Discover Your True Path <br className="hidden md:block" /> Through Numerology
          </h1>
          <p className="text-white/90 text-sm md:text-sm lg:text-base leading-relaxed font-normal max-w-lg mx-auto md:mx-0 text-center md:text-left">
            Unlock the hidden meanings of your birth numbers and name. Gain deep insights into your personality, destiny, and life's true purpose.
          </p>

          <div className="space-y-3 lg:space-y-5 pt-4 border-t border-white/20 max-w-md w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/50 mt-0.5">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-white">Core & Birth Analysis</h3>
                <p className="text-sm text-white/70 mt-0.5">Discover the deep meanings behind your birth numbers.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/50 mt-0.5">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-white">Name Destiny</h3>
                <p className="text-sm text-white/70 mt-0.5">Understand how your name vibrates and shapes your true destiny.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/50 mt-0.5">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-white">Lucky & Friendly Numbers</h3>
                <p className="text-sm text-white/70 mt-0.5">Unlock the specific numbers that bring you harmony and success.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/50 mt-0.5">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-white">Month Forecast</h3>
                <p className="text-sm text-white/70 mt-0.5">Get actionable predictions and guidance for the upcoming months.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-visible max-w-md w-full mx-auto md:ml-auto md:mr-0 flex flex-col max-h-full">

          {/* Tabs */}
          <div className="flex w-full shrink-0">
            <button
              onClick={() => setActiveTab('Numerology')}
              className={`flex-1 py-3 text-center font-normal text-sm transition-colors duration-200 rounded-t-2xl ${activeTab === 'Numerology'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
            >
              Numerology
            </button>
          </div>

          <div className="p-4 md:p-5 lg:p-6 space-y-3 lg:space-y-4 relative flex-1">
            {/* Header Title Grid */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-serif text-lg md:text-xl lg:text-2xl font-normal text-gray-800 tracking-tight leading-none">
                  Enter Your Birth Details
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  Get your personalized Numerology report with accurate predictions.
                </p>
              </div>

              {/* Language Selection */}
              {/* <div className="relative mt-1">
                <label htmlFor="language-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                  Language
                </label>
                <div className="relative">
                  <CustomSelect
                    id="language-select"
                    value={language}
                    onChange={(val) => setLanguage(val)}
                    options={['English', 'Hindi']}
                    className="!pl-3 !pr-8 !py-2 !text-sm border-gray-200 rounded-lg"
                  />
                </div>
              </div> */}
            </div>

            {/* Input Details form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Row: Name and Gender */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="relative">
                  <label htmlFor="name-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={data.fullName}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      onChange({ fullName: val });
                    }}
                    className="w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Your Name"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="gender-select" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Gender
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="gender-select"
                      required
                      value={data.gender}
                      onChange={(val) => onChange({ gender: val as 'Male' | 'Female' | 'Prefer not to say' })}
                      placeholder="Select Gender"
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Prefer not to say', label: 'Other' }
                      ]}
                      className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="grid grid-cols-1 gap-3 pt-1">
                <div className="relative mt-1">
                  <label htmlFor="email-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              {/* Day / Month / Year Dropdowns */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {/* Day */}
                <div className="relative">
                  <label htmlFor="day-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Day
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="day-select"
                      required
                      value={data.birthDay}
                      onChange={(val) => onChange({ birthDay: val })}
                      placeholder="Day"
                      options={days}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Month */}
                <div className="relative">
                  <label htmlFor="month-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Month
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="month-select"
                      required
                      value={data.birthMonth}
                      onChange={(val) => onChange({ birthMonth: val })}
                      placeholder="Month"
                      options={MONTHS.map(m => ({ value: m.val, label: m.name }))}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Year */}
                <div className="relative">
                  <label htmlFor="year-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Year
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="year-select"
                      required
                      value={data.birthYear}
                      onChange={(val) => onChange({ birthYear: val })}
                      placeholder="Year"
                      options={years}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Birth Time: Hour / Minute / AM/PM */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {/* Hour */}
                <div className="relative">
                  <label id="hour-label" htmlFor="hour-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Hour
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="hour-select"
                      required
                      value={String(parseInt(data.birthHour || '12') % 12 || 12).padStart(2, '0')}
                      onChange={(val) => {
                        const isPM = parseInt(data.birthHour || '12') >= 12;
                        const numVal = parseInt(val);
                        let new24Hour = numVal;
                        if (isPM && numVal !== 12) new24Hour += 12;
                        if (!isPM && numVal === 12) new24Hour = 0;
                        onChange({ birthHour: String(new24Hour).padStart(2, '0') });
                      }}
                      placeholder="Hour"
                      options={Array.from({ length: 12 }, (_, i) => {
                        const h = String(i + 1).padStart(2, '0');
                        return { value: h, label: h };
                      })}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Minute */}
                <div className="relative">
                  <label id="minute-label" htmlFor="minute-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Minute
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="minute-select"
                      required
                      value={data.birthMinute}
                      onChange={(val) => onChange({ birthMinute: val })}
                      placeholder="Min"
                      options={Array.from({ length: 60 }, (_, i) => {
                        const v = String(i).padStart(2, '0');
                        return { value: v, label: v };
                      })}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* AM / PM */}
                <div className="relative">
                  <label id="ampm-label" htmlFor="ampm-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    AM / PM
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="ampm-select"
                      required
                      value={parseInt(data.birthHour || '12') >= 12 ? 'PM' : 'AM'}
                      onChange={(val) => {
                        const current12 = parseInt(data.birthHour || '12') % 12 || 12;
                        let new24Hour = current12;
                        if (val === 'PM' && current12 !== 12) new24Hour += 12;
                        if (val === 'AM' && current12 === 12) new24Hour = 0;
                        onChange({ birthHour: String(new24Hour).padStart(2, '0') });
                      }}
                      placeholder="AM/PM"
                      options={[
                        { value: 'AM', label: 'AM' },
                        { value: 'PM', label: 'PM' }
                      ]}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Row: Country and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="relative">
                  <label htmlFor="country-select" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    Country
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="country-select"
                      required
                      searchable
                      value={data.birthCountry}
                      onChange={(val) => onChange({ birthCountry: val, birthCity: '' })}
                      placeholder="Select Country"
                      options={Country.getAllCountries().map((c: ICountry) => ({ value: c.isoCode, label: c.name }))}
                      className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="city-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                    City
                  </label>
                  <div className="relative">
                    <input
                      id="city-input"
                      type="text"
                      required
                      value={data.birthCity}
                      onChange={(e) => {
                        onChange({ birthCity: e.target.value });
                        setIsValidCity(false);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      disabled={!data.birthCountry}
                      placeholder="Type your city"
                      className="w-full pl-4 pr-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-text relative z-0 disabled:opacity-50"
                      autoComplete="off"
                    />
                    <AnimatePresence>
                      {showSuggestions && data.birthCity.length >= 3 && (
                        <motion.ul
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 right-0 bottom-full z-50 mb-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl py-1"
                        >
                          {isSearching ? (
                            <li className="px-4 py-3 text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Searching for "{data.birthCity}"...
                            </li>
                          ) : apiCities.length > 0 ? (
                            apiCities.map((city, idx) => (
                              <li
                                key={`${city.displayName}-${idx}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  onChange({ birthCity: city.name, latitude: String(city.lat), longitude: String(city.lng) });
                                  setIsValidCity(true);
                                  setShowSuggestions(false);
                                }}
                                className="px-4 py-2 text-sm text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                              >
                                <span className="block font-bold text-gray-900">{city.name}</span>
                                <span className="block text-[10px] text-gray-500 truncate mt-0.5">{city.displayName}</span>
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-3 text-sm text-gray-500 font-medium text-center">
                              No cities found. Please check spelling.
                            </li>
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Orange CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-normal text-sm md:text-[13px] lg:text-base whitespace-nowrap rounded-xl shadow-lg transition-all duration-200 cursor-pointer text-center"
                >
                  Create Your Numerology Report Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
