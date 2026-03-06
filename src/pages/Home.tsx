import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Zap, Shield, HelpCircle, ChevronDown, ChevronUp, Smartphone, Monitor, Link as LinkIcon, PlayCircle, Music, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../translations';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  useEffect(() => {
    const t = translations[lang];
    // Update SEO meta tags when language changes
    document.title = t.seo.title;
    document.documentElement.lang = lang;
    
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', t.seo.description);
    setMeta('keywords', t.seo.keywords);
    setOgMeta('og:title', t.seo.title);
    setOgMeta('og:description', t.seo.description);
    setOgMeta('twitter:title', t.seo.title);
    setOgMeta('twitter:description', t.seo.description);

    // Structured Data (JSON-LD)
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Save Video Tiktok",
        "url": "https://savevideotik.com",
        "description": t.seo.description,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": t.faq.q1, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a1 } },
          { "@type": "Question", "name": t.faq.q2, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a2 } },
          { "@type": "Question", "name": t.faq.q3, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a3 } },
          { "@type": "Question", "name": t.faq.q4, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a4 } },
          { "@type": "Question", "name": t.faq.q5, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a5 } }
        ]
      }
    ];

    let script = document.getElementById('structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [lang]);

  const t = translations[lang];

  const [result, setResult] = useState<null | { 
    title: string, 
    thumbnail: string,
    play: string,
    hdplay: string,
    music: string,
    author: string
  }>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError(t.errors.empty);
      return;
    }
    
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(t.errors.fetch + " (Server returned an invalid response. Please make sure the backend is running.)");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.errors.fetch);
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || t.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl: string, filename: string) => {
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(filename)}`;
    window.location.href = proxyUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-pink-200 selection:text-pink-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-600">
              <a href="#como-baixar" className="hover:text-[#fe0979] transition-colors">{t.nav.howTo}</a>
              <a href="#recursos" className="hover:text-[#fe0979] transition-colors">{t.nav.features}</a>
              <a href="#faq" className="hover:text-[#fe0979] transition-colors">{t.nav.faq}</a>
            </nav>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Globe className="w-4 h-4" />
              <select 
                value={lang} 
                onChange={(e) => {
                  const newLang = e.target.value as Language;
                  setLang(newLang);
                  localStorage.setItem('preferred_language', newLang);
                }}
                className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium outline-none"
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 pt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#fe0979]">{t.hero.title2}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <form onSubmit={handleDownload} className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.hero.placeholder}
                className="block w-full pl-11 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-[#fe0979] transition-colors shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.hero.loading}</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>{t.hero.download}</span>
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            {t.hero.terms}
          </p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 px-4 bg-gray-50"
          >
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="w-48 h-64 rounded-xl overflow-hidden shadow-md shrink-0 relative group">
                <img src={result.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{result.title || `${t.result.videoOf} @${result.author}`}</h3>
                <p className="text-sm text-gray-500">{t.result.videoOf} @{result.author}</p>
                
                <div className="flex flex-col gap-3 mt-2">
                  <button 
                    onClick={() => triggerDownload(result.play, `video_${result.author}.mp4`)}
                    className="w-full py-3 px-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    {t.result.noWatermark}
                  </button>
                  <button 
                    onClick={() => triggerDownload(result.hdplay, `video_hd_${result.author}.mp4`)}
                    className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    {t.result.hd}
                  </button>
                  <button 
                    onClick={() => triggerDownload(result.music, `audio_${result.author}.mp3`)}
                    className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Music className="w-5 h-5 text-gray-500" />
                    {t.result.audio}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* How to Download */}
      <section id="como-baixar" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.howTo.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.howTo.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#fe0979]">1</div>
              <h3 className="text-xl font-bold mb-3">{t.howTo.step1Title}</h3>
              <p className="text-gray-600 text-sm">{t.howTo.step1Desc}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#fe0979]">2</div>
              <h3 className="text-xl font-bold mb-3">{t.howTo.step2Title}</h3>
              <p className="text-gray-600 text-sm">{t.howTo.step2Desc}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#fe0979]">3</div>
              <h3 className="text-xl font-bold mb-3">{t.howTo.step3Title}</h3>
              <p className="text-gray-600 text-sm">{t.howTo.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<CheckCircle className="w-6 h-6 text-[#00f2fe]" />}
              title={t.features.f1Title}
              description={t.features.f1Desc}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-[#fe0979]" />}
              title={t.features.f2Title}
              description={t.features.f2Desc}
            />
            <FeatureCard 
              icon={<Monitor className="w-6 h-6 text-purple-500" />}
              title={t.features.f3Title}
              description={t.features.f3Desc}
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-green-500" />}
              title={t.features.f4Title}
              description={t.features.f4Desc}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
          </div>

          <div className="space-y-4">
            <FaqItem question={t.faq.q1} answer={t.faq.a1} />
            <FaqItem question={t.faq.q2} answer={t.faq.a2} />
            <FaqItem question={t.faq.q3} answer={t.faq.a3} />
            <FaqItem question={t.faq.q4} answer={t.faq.a4} />
            <FaqItem question={t.faq.q5} answer={t.faq.a5} />
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo dark />
            </div>
            <p className="text-sm">
              {t.footer.desc}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#como-baixar" className="hover:text-white transition-colors">{t.nav.howTo}</a></li>
              <li><a href="#recursos" className="hover:text-white transition-colors">{t.nav.features}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t.nav.faq}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="mt-2 text-xs">{t.footer.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:bg-gray-50"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-4 text-gray-600 text-sm">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 bg-white border-2 border-gray-900 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
        <div className="absolute inset-0 bg-gray-900 rounded-xl -rotate-3 transition-transform group-hover:-rotate-6"></div>
        <div className="relative bg-gray-900 w-full h-full rounded-xl flex items-center justify-center">
          <Download className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
      </div>
      <span className={`font-extrabold text-xl tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
        Save Video Tiktok
      </span>
    </div>
  );
}
