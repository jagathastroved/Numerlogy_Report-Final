import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import BirthDetailsForm from './slides/BirthDetailsForm';
import AstroCalculatingSlide from './slides/AstroCalculatingSlide';
import NumerologyReportLayout from './components/layout/NumerologyReportLayout';
import { type PersonalDetails } from './types';

// Import our Numerology slide components
import Welcome from './slides/Welcome';
import CoreNumbers from './slides/CoreNumbers';
import LifePathMath from './slides/LifePathMath';
import LifePathDetail from './slides/LifePathDetail';
import NameDestinyMath from './slides/NameDestinyMath';
import NumerologyOverview from './slides/NumerologyOverview';
import LuckyTraits from './slides/LuckyTraits';
import MonthForecast from './slides/MonthForecast';
import PremiumDeliverables from './slides/PremiumDeliverables';

export function AppRoutes() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>('English');

  // Pre-populated defaults to Nivash, 10 Oct 2002, 10:30:00, Chennai, India
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
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

  const handleUpdateDetails = (updates: Partial<PersonalDetails>) => {
    setPersonalDetails((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Routes>
      <Route path="/" element={
        <BirthDetailsForm
          data={personalDetails}
          language={language}
          setLanguage={setLanguage}
          onChange={handleUpdateDetails}
        />
      } />
      <Route path="/calculating" element={<AstroCalculatingSlide onComplete={() => navigate('/welcome')} />} />

      {/* Nested Layout for the Report Pages */}
      <Route element={<NumerologyReportLayout />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/core-numbers" element={<CoreNumbers />} />
        <Route path="/life-path-math" element={<LifePathMath />} />
        <Route path="/life-path-detail" element={<LifePathDetail />} />
        <Route path="/name-destiny-math" element={<NameDestinyMath />} />
        <Route path="/numerology-overview" element={<NumerologyOverview />} />
        <Route path="/lucky-traits" element={<LuckyTraits />} />
        <Route path="/month-forecast" element={<MonthForecast />} />
        <Route path="/premium-deliverables" element={<PremiumDeliverables />} />
      </Route>

      {/* Catch-all route for invalid paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
