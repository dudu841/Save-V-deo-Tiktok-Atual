import { useState, useEffect } from 'react';
import { Language } from '../translations';

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('preferred_language') as Language;
    if (savedLang && ['en', 'pt', 'es'].includes(savedLang)) {
      return savedLang;
    }
    return 'en'; // Default to English
  });

  useEffect(() => {
    const detectLocationAndLanguage = async () => {
      if (!localStorage.getItem('preferred_language')) {
        try {
          const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
          if (!response.ok) throw new Error('Failed to fetch location');
          const data = await response.json();
          const countryCode = data.country_code;
          
          const ptCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
          const esCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'PA', 'UY', 'GQ'];
          
          let detectedLang: Language = 'en';
          if (ptCountries.includes(countryCode)) {
            detectedLang = 'pt';
          } else if (esCountries.includes(countryCode)) {
            detectedLang = 'es';
          }
          
          setLang(detectedLang);
        } catch (error) {
          console.error('Error detecting location:', error);
          // Fallback to browser language if location detection fails
          const browserLang = navigator.language.split('-')[0];
          if (browserLang === 'pt' || browserLang === 'es') {
            setLang(browserLang as Language);
          }
        }
      }
    };

    detectLocationAndLanguage();
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('preferred_language', newLang);
  };

  return { lang, changeLanguage };
}
