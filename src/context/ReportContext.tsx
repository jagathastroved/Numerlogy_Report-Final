import { createContext, useContext, useState, ReactNode } from 'react';
import { NumerologyReportData, PersonalDetails } from '../types';
import { fetchNumerologyReport } from '../api/report';

interface ReportContextType {
  reportData: NumerologyReportData | null;
  isLoading: boolean;
  hasError: boolean;
  fetchReport: (details: PersonalDetails) => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reportData, setReportData] = useState<NumerologyReportData | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('numerologyReportData');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchReport = async (details: PersonalDetails) => {
    setIsLoading(true);
    setHasError(false);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/numerology', { method: 'POST', body: JSON.stringify(details) });
      // const data = await response.json();

      // Call actual API
      const apiData = await fetchNumerologyReport(details);

      // Map API response to the frontend format
      const mappedData: NumerologyReportData = {
        personalDetails: details,
        coreNumbers: {
          birthNumber: apiData.coreNumbers?.birthNumber || 0,
          destinyNumber: apiData.coreNumbers?.destinyNumber || 0,
          nameNumber: apiData.coreNumbers?.nameNumber || 0,
          lifePathNumber: apiData.lifePathDetail?.lifePathNumber || apiData.lifePathMath?.lifePathNumber || 0,
          birthNumberContent: apiData.coreNumbers?.birthNumberContent || '',
          destinyNumberContent: apiData.coreNumbers?.destinyNumberContent || '',
          nameNumberContent: apiData.coreNumbers?.nameNumberContent || ''
        },
        interpretations: {
          lifePath: {
            title: `Life Path ${apiData.lifePathDetail?.lifePathNumber || ''}`,
            subtitle: "Your Foundational Vibration",
            description: apiData.lifePathDetail?.numberContent || '',
            strengths: apiData.lifePathDetail?.topStrengths || [],
            challenges: apiData.lifePathDetail?.topChallenges || [],
          },
          destiny: {
            title: `Name Number ${apiData.coreNumbers?.nameNumber || apiData.nameDestinyNumberPage?.nameDestinyNumber || ''}`,
            desc: apiData.nameDestinyNumberPage?.destinyNumberContent || apiData.coreNumbers?.destinyNumberContent || ''
          }
        },
        lucky_traits: {
          lucky_numbers: apiData.luckyTraits?.luckyNumbers || [],
          lucky_colors: apiData.luckyTraits?.luckyColors || []
        },
        monthlyForecast: {
          monthForecastNumber: apiData.monthlyForecast?.monthForecastNumber || 0,
          monthForecastContent: apiData.monthlyForecast?.monthForecastContent || ''
        }
      };

      setReportData(mappedData);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('numerologyReportData', JSON.stringify(mappedData));
      }
    } catch (error) {
      console.error('Failed to fetch report:', error);
      setHasError(true);
      setReportData(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('numerologyReportData');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReportContext.Provider value={{ reportData, isLoading, hasError, fetchReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}
