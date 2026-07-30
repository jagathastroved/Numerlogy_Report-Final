/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'Male' | 'Female' | 'Prefer not to say';

export interface PersonalDetails {
  fullName: string;
  email: string;
  gender: Gender | '';
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
  birthMinute: string;
  birthSecond: string;
  birthCountry: string;
  birthCity: string;
  latitude?: number | string;
  longitude?: number | string;
}

export interface LocationPreferences {
  country: string;
  includeLifePath: boolean;
  includeLuckyTraits: boolean;
}

export interface NumerologyInsights {
  lifePathNumber: number;
  destinyNumber: number;
  luckyNumberThisYear: number;
  friendlyNumbers: number[];
  enemyNumbers: number[];
  lifePathTitle: string;
  lifePathDescription: string;
  destinyTitle: string;
  destinyDescription: string;
  personalityTraits: string[];
  strengths: string[];
  challenges: string[];
  careerRecommendations: string[];
  relationshipCompatibility: string;
}

export interface NumerologyDefinition {
  title: string;
  subtitle?: string;
  description: string;
  strengths: string[];
  challenges: string[];
}

export interface NumerologyReportData {
  personalDetails: PersonalDetails;
  coreNumbers: {
    birthNumber: number;
    destinyNumber: number;
    nameNumber: number;
    lifePathNumber?: number;
    birthNumberContent?: string;
    destinyNumberContent?: string;
    nameNumberContent?: string;
  };
  interpretations: {
    lifePath: NumerologyDefinition;
    destiny: { title: string; desc: string };
  };
  lucky_traits: {
    lucky_numbers: number[];
    lucky_colors: string[];
  };
  monthlyForecast: {
    monthForecastNumber: number;
    monthForecastContent: string;
  };
}

