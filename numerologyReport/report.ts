import { PersonalDetails } from '../types';
import { Country } from 'country-state-city';
import axios from 'axios';

const API_URL = '/numerology-report/api/generate-report';

export const fetchNumerologyReport = async (details: PersonalDetails) => {
  try {
    const countryObj = Country.getCountryByCode(details.birthCountry.trim().toUpperCase());
    const countryName = countryObj ? countryObj.name : details.birthCountry;

    const payload = {
      fullName: details.fullName.trim(),
      email: details.email.trim(),
      gender: details.gender ? details.gender.toLowerCase() : '',
      birthDay: details.birthDay.padStart(2, '0'),
      birthMonth: details.birthMonth.padStart(2, '0'),
      birthYear: details.birthYear,
      birthHour: details.birthHour.padStart(2, '0'),
      birthMinute: details.birthMinute.padStart(2, '0'),
      birthSecond: (details.birthSecond || '00').padStart(2, '0'),
      birthCountry: countryName.trim().toLowerCase(),
      birthCity: details.birthCity.trim().toLowerCase(),
      latitude: details.latitude,
      longitude: details.longitude,
      promo: details.promoCode
    };

    // console.log('Sending API Payload:', payload);

    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    const data = response.data;
    // console.log("Response Data: ", data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
