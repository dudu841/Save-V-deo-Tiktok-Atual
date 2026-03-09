import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Download, CheckCircle, Shield, Zap, Monitor, Smartphone, Globe, ArrowRight, HelpCircle } from 'lucide-react';
import { landingPages } from '../data/landingPages';
import { useLanguage } from '../hooks/useLanguage';
import { landingTranslations } from '../translations/landing';
import { Language } from '../translations';

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const pageData = landingPages.find(p => p.slug === slug);
  const { lang, changeLanguage } = useLanguage();

  useEffect(() => {
    if (pageData) {
      const keyword = pageData.keyword[lang];
      const t = landingTranslations[lang];
      document.title = t.metaTitle.replace('{keyword}', keyword);
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', t.metaDesc.replace('{keyword}', keyword));
      }

      // Canonical Tag
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://savevideotik.com/${pageData.slug}`);
    }
  }, [pageData, lang]);

  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  const keyword = pageData.keyword[lang];
  const t = landingTranslations[lang];

  const replaceKeyword = (text: string) => text.replace(/\{keyword\}/g, keyword);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 bg-white border-2 border-gray-900 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-xl -rotate-3 transition-transform group-hover:-rotate-6"></div>
              <div className="relative bg-gray-900 w-full h-full rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              Savevideotik
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#fe0979] transition-colors hidden sm:block">
              {t.goToDownloader}
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Globe className="w-4 h-4" />
              <select 
                value={lang} 
                onChange={(e) => changeLanguage(e.target.value as Language)}
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

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">
            {keyword}
          </h1>

          <div className="bg-gradient-to-r from-[#00f2fe]/10 to-[#fe0979]/10 rounded-2xl p-8 mb-12 text-center border border-pink-100">
            <p className="text-xl text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: replaceKeyword(t.heroDesc) }} />
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all text-lg">
              <Download className="w-6 h-6" />
              {replaceKeyword(t.tryNow)}
            </Link>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{replaceKeyword(t.whatIsTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: replaceKeyword(t.whatIsP1) }} />
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.whatIsP2)}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.whatIsP3)}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.whatIsP4)}</p>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t.readyToStart}</h3>
              <p className="mb-6 text-gray-600 text-lg">{replaceKeyword(t.experienceFastest)}</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 text-lg">
                <ArrowRight className="w-5 h-5" />
                {t.clickHereHome}
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{replaceKeyword(t.howToTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.howToDesc)}</p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-[#fe0979]/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f2fe]/10 to-[#fe0979]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-md">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{replaceKeyword(t.step1Title)}</h3>
                <p className="text-gray-600">{replaceKeyword(t.step1Desc)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-[#fe0979]/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f2fe]/10 to-[#fe0979]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-md">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{replaceKeyword(t.step2Title)}</h3>
                <p className="text-gray-600">{replaceKeyword(t.step2Desc)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-[#fe0979]/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f2fe]/10 to-[#fe0979]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-md">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{replaceKeyword(t.step3Title)}</h3>
                <p className="text-gray-600">{replaceKeyword(t.step3Desc)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-[#fe0979]/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f2fe]/10 to-[#fe0979]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-md">4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{replaceKeyword(t.step4Title)}</h3>
                <p className="text-gray-600">{replaceKeyword(t.step4Desc)}</p>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#fe0979]/20 rounded-full blur-3xl -z-10"></div>
              <h3 className="text-2xl font-bold mb-3">{t.gotLinkReady}</h3>
              <p className="mb-6 text-gray-300 text-lg">{t.pasteItNow}</p>
              <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-pink-500/20">
                <Download className="w-6 h-6" />
                {t.goToHomepage}
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{replaceKeyword(t.advTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.advDesc)}</p>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mt-1">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{replaceKeyword(t.adv1Title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.adv1Desc)}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mt-1">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{replaceKeyword(t.adv2Title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.adv2Desc)}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mt-1">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{replaceKeyword(t.adv3Title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.adv3Desc)}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mt-1">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{replaceKeyword(t.adv4Title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.adv4Desc)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t.experiencePremium}</h3>
              <p className="mb-6 text-gray-600 text-lg">{t.joinMillions}</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 text-lg">
                <Download className="w-5 h-5" />
                {t.goToHomepage}
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{replaceKeyword(t.techTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.techDesc)}</p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">{replaceKeyword(t.tech1Title)}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.tech1Desc1)}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.tech1Desc2)}</p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">{replaceKeyword(t.tech2Title)}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.tech2Desc)}</p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech2Li1) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech2Li2) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech2Li3) }} />
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">{replaceKeyword(t.tech3Title)}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.tech3Desc)}</p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech3Li1) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech3Li2) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.tech3Li3) }} />
            </ul>

            <div className="bg-gray-900 text-white rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#fe0979]/20 rounded-full blur-3xl -z-10"></div>
              <h3 className="text-2xl font-bold mb-3">{t.secureDownloadToday}</h3>
              <p className="mb-6 text-gray-300 text-lg">{t.safeWebBased}</p>
              <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-pink-500/20">
                <Shield className="w-6 h-6" />
                {t.goToHomepage}
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{replaceKeyword(t.evoTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.evoP1)}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.evoP2)}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.evoP3)}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.evoP4)}</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-12">{replaceKeyword(t.creatorsTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.creatorsP1)}</p>
            <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: replaceKeyword(t.creatorsP2) }} />
            <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: replaceKeyword(t.creatorsP3) }} />
            <p className="text-gray-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: replaceKeyword(t.creatorsP4) }} />

            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-12">{replaceKeyword(t.troubleTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{replaceKeyword(t.troubleP1)}</p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-4">
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.troubleLi1) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.troubleLi2) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.troubleLi3) }} />
              <li dangerouslySetInnerHTML={{ __html: replaceKeyword(t.troubleLi4) }} />
            </ul>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm mt-12">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t.readyElevate}</h3>
              <p className="mb-6 text-gray-600 text-lg">{replaceKeyword(t.useMostPowerful)}</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 text-lg">
                <Download className="w-6 h-6" />
                {t.goToHomepage}
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{replaceKeyword(t.faqTitle)}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{replaceKeyword(t.faqDesc)}</p>

            <div className="space-y-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq1Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq1A)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq2Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq2A)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq3Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq3A)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq4Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq4A)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq5Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq5A)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  {replaceKeyword(t.faq6Q)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{replaceKeyword(t.faq6A)}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{t.haveMoreQuestions}</h3>
              <p className="mb-6 text-gray-600 text-lg">{t.bestWayToUnderstand}</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 text-lg">
                <ArrowRight className="w-5 h-5" />
                {t.goToHomepage}
              </Link>
            </div>
          </section>

        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 mt-20">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2.5 group cursor-pointer mb-6">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-white border-2 border-gray-900 rounded-lg transform rotate-6"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-lg -rotate-3"></div>
              <div className="relative bg-gray-900 w-full h-full rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Savevideotik
            </span>
          </Link>
          <p className="text-sm">{replaceKeyword(t.footerDesc)}</p>
        </div>

        <div className="max-w-5xl mx-auto pt-8 border-t border-gray-800 mb-8">
          <h4 className="text-white font-semibold mb-6 text-center">{t.popularTools}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center md:text-left">
            {landingPages.map((page) => (
              <Link key={page.slug} to={`/${page.slug}`} className="hover:text-white transition-colors">
                {page.keyword[lang]}
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Savevideotik. {t.allRightsReserved}</p>
        </div>
      </footer>
    </div>
  );
}
