import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Download, CheckCircle, Shield, Zap, Monitor, Smartphone, Globe, ArrowRight, HelpCircle } from 'lucide-react';
import { landingPages } from '../data/landingPages';

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const pageData = landingPages.find(p => p.slug === slug);

  useEffect(() => {
    if (pageData) {
      document.title = `${pageData.keyword} - Free Online Tool | Savevideotik`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `The best tool for ${pageData.keyword}. Fast, free, and secure online downloader. No watermark, HD quality supported.`);
      }
    }
  }, [pageData]);

  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  const { keyword } = pageData;

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
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#fe0979] transition-colors">
            Go to Downloader
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">
            {keyword}
          </h1>

          <div className="bg-gradient-to-r from-[#00f2fe]/10 to-[#fe0979]/10 rounded-2xl p-8 mb-12 text-center border border-pink-100">
            <p className="text-xl text-gray-700 mb-6">
              Welcome to the ultimate guide and tool for <strong>{keyword}</strong>. If you are looking for the fastest, safest, and most reliable way to save your favorite TikTok content directly to your device, you have found the perfect solution. Our platform is designed to provide a seamless experience, completely free of charge.
            </p>
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fe0979] hover:bg-[#e0086b] text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all text-lg">
              <Download className="w-6 h-6" />
              Try {keyword} Now on Homepage
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is {keyword}?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In the rapidly evolving landscape of social media, TikTok has solidified its position as the undisputed king of short-form video content. With billions of active users worldwide, the platform is a constant stream of viral dances, educational snippets, hilarious comedy sketches, and groundbreaking trends. However, as users consume this endless feed of entertainment, a common need arises: the desire to save these videos for offline viewing, sharing on other platforms, or personal archiving. This is exactly where the concept of <strong>{keyword}</strong> comes into play.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The native TikTok application does offer a built-in download feature for some videos, but it comes with significant limitations. Most notably, any video downloaded directly through the app is stamped with a prominent, bouncing watermark featuring the TikTok logo and the creator's username. While this is great for brand recognition, it can be highly distracting and undesirable if you want to use the video for a presentation, share it cleanly on Instagram Reels or YouTube Shorts, or simply keep a pristine copy for yourself. Furthermore, many creators disable the download option entirely, leaving users frustrated when they find a video they truly want to keep.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our dedicated tool for {keyword} was built specifically to bypass these frustrating limitations. It acts as a bridge between the TikTok servers and your device, utilizing advanced extraction algorithms to retrieve the raw video file before the watermark is applied. This means that when you use our service, you are getting the purest, highest-quality version of the content possible.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you are a professional content creator looking to repurpose your own drafts, a digital marketer analyzing competitor strategies, a meme enthusiast building a collection, or just an everyday user who wants to save a recipe video without the annoying logo blocking the ingredients, mastering {keyword} is an essential digital skill in today's internet ecosystem.
            </p>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Ready to start downloading?</h3>
              <p className="mb-6 text-gray-600 text-lg">Experience the fastest and most reliable {keyword} tool on the web right now.</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
                Click here to use Savevideotik on the Home page <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use Our Tool for {keyword}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We understand that not everyone is a tech expert, which is why we have engineered our platform to be incredibly user-friendly. The process for {keyword} requires absolutely no technical knowledge, no software installation, and no account registration. It is as simple as copy and paste. Follow this comprehensive, step-by-step guide to get your videos in seconds:
            </p>
            
            <div className="space-y-8 mb-10">
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f2fe] to-[#fe0979] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Locate the Video on TikTok</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Begin by opening the TikTok application on your smartphone (iOS or Android) or by navigating to the TikTok website on your desktop browser. Scroll through your "For You" page, check your following feed, or use the search bar to find the specific video you wish to process for {keyword}. Once you have the video playing on your screen, you are ready for the next step.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f2fe] to-[#fe0979] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Copy the Video URL</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To tell our system which video you want, you need its unique web address (URL). On the mobile app, tap the "Share" icon located on the right side of the screen (it usually looks like a right-pointing arrow). A menu will pop up; look for the button that says "Copy Link" (often represented by a chainlink icon) and tap it. If you are on a computer, simply click on the address bar at the top of your browser, highlight the entire URL, right-click, and select "Copy" (or press Ctrl+C / Cmd+C).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f2fe] to-[#fe0979] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Paste and Download</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Now, navigate back to our website, Savevideotik.com. Right at the top of the homepage, you will see a large, prominent input field. Tap or click inside this box and paste the link you just copied (right-click and "Paste", or Ctrl+V / Cmd+V). Once the link is in the box, hit the main download button. Our servers will instantly begin processing your request for {keyword}.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f2fe] to-[#fe0979] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Select Your Preferred Format</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Within a few seconds, the page will update to show you a preview of your video along with several download options. You can choose to download the standard MP4 video without a watermark, opt for the High Definition (HD) version for the best visual quality, or even extract just the audio track as an MP3 file. Click your desired option, and the file will immediately begin saving to your device.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 flex flex-col items-center text-center shadow-lg">
              <h3 className="text-2xl font-bold mb-3 text-white">Got your TikTok link ready?</h3>
              <p className="mb-6 text-gray-300 text-lg">Paste it now and get your file instantly without any hassle.</p>
              <Link to="/" className="bg-[#fe0979] hover:bg-[#e0086b] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-lg shadow-lg shadow-pink-500/20">
                <Download className="w-6 h-6" />
                Go to Homepage to Download
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Advantages of Using Savevideotik for {keyword}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The internet is full of tools claiming to offer the best service, but many fall short, bombarding users with pop-ups, requiring shady software installations, or delivering low-quality files. When it comes to {keyword}, Savevideotik stands head and shoulders above the rest. Here is an in-depth look at the unparalleled advantages we offer:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#00f2fe]/10 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[#00f2fe]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Absolute Removal of Watermarks</h3>
                <p className="text-gray-600 leading-relaxed">
                  The primary reason users seek out {keyword} is to get rid of the TikTok watermark. Our advanced API integration fetches the original video file directly from the source servers before the platform overlays its logo. This guarantees a 100% clean video, perfect for professional editing, reaction videos, or cross-posting to other social networks without algorithmic penalties.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#fe0979]/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#fe0979]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Blazing Fast Processing Speeds</h3>
                <p className="text-gray-600 leading-relaxed">
                  Time is valuable. We have invested heavily in high-performance cloud infrastructure to ensure that your requests are handled with lightning speed. The moment you click download, our servers process the URL, extract the media, and deliver the file to your browser in mere milliseconds. You won't be left staring at a loading screen.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Uncompromising Security & Privacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your privacy is our top priority. Unlike many other services, we do not require you to create an account, provide an email address, or log in with your social media profiles. Furthermore, we operate a strict no-logs policy regarding the content you download. We do not store copies of your downloaded videos on our servers, ensuring complete anonymity.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">100% Free, Forever</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe that basic internet utilities should be accessible to everyone. Our service for {keyword} is completely free to use. There are no hidden subscription fees, no premium tiers that lock away HD quality, and no limits on how many videos you can download per day. Enjoy unrestricted access 24/7.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Experience these premium benefits for free</h3>
              <p className="mb-6 text-gray-600 text-lg">Join millions of satisfied users who trust us daily.</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
                Click here to use Savevideotik on the Home page <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Details, Compatibility & Security</h2>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              To fully appreciate the power of our tool for {keyword}, it helps to understand the technical foundation it is built upon, how it interacts with your specific devices, and the security measures we have put in place to protect you.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4 flex items-center gap-2">
              <Monitor className="w-6 h-6 text-[#fe0979]" />
              Technical Specifications & Formats
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you submit a link for {keyword}, our backend systems communicate directly with TikTok's Content Delivery Network (CDN). We parse the video metadata to locate the highest available resolution file. By default, we provide downloads in the universally compatible MP4 format, ensuring the video will play flawlessly on any modern device, media player, or editing software.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Additionally, we offer an audio extraction feature. If you only want the catchy song or funny voiceover from a video, our system can strip the audio track and provide it to you as a high-quality MP3 file (typically 128kbps to 320kbps, depending on the source). This is perfect for creating ringtones or adding sounds to your own projects.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4 flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-[#fe0979]" />
              Universal Device Compatibility
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The beauty of a Progressive Web App (PWA) architecture is that it eliminates the need for device-specific applications. Our platform for {keyword} is fully responsive and optimized for every screen size and operating system:
            </p>
            <ul className="list-none space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>iOS Ecosystem (iPhone & iPad):</strong> Apple devices are notoriously strict about file downloads. However, using Safari on iOS 13 or later, you can download files directly to your "Files" app or Camera Roll seamlessly using our site. No need for third-party file manager apps.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Android Devices:</strong> Whether you use Google Chrome, Mozilla Firefox, Brave, or Samsung Internet, our site works perfectly. Files are typically saved straight to your "Downloads" folder or Gallery.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Desktop & Laptop Computers:</strong> Windows PCs, MacBooks (macOS), and Linux machines are fully supported. Downloading on a desktop offers the easiest way to organize large batches of videos for editing in software like Premiere Pro or Final Cut.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#fe0979]" />
              Essential Security Tips
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we guarantee the safety of Savevideotik.com, the internet is fraught with risks. When searching for {keyword}, always adhere to these security best practices:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li><strong>Verify the URL:</strong> Always ensure you are on the official <code>savevideotik.com</code> domain. Scammers often create lookalike sites to distribute malware.</li>
              <li><strong>Avoid App Installations:</strong> You do <em>not</em> need to install an app, browser extension, or software program to download TikTok videos. If a site forces you to download an `.exe` or `.apk` file to proceed, leave immediately.</li>
              <li><strong>Look for the Padlock:</strong> Ensure the site uses HTTPS (indicated by a padlock icon in your browser's address bar). This means your connection is encrypted, protecting your data from interception.</li>
            </ul>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 flex flex-col items-center text-center shadow-lg mt-10">
              <h3 className="text-2xl font-bold mb-3 text-white">Secure your download today</h3>
              <p className="mb-6 text-gray-300 text-lg">100% safe, web-based downloading across all your devices.</p>
              <Link to="/" className="bg-[#fe0979] hover:bg-[#e0086b] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-lg shadow-lg shadow-pink-500/20">
                <Download className="w-6 h-6" />
                Go to Homepage to Download
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions (FAQ)</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We receive many inquiries about how our service works. Below, we have compiled the most comprehensive answers to the most common questions regarding {keyword}.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Is {keyword} really 100% free?
                </h3>
                <p className="text-gray-600 leading-relaxed">Yes, absolutely. Our service is entirely free to use for everyone, everywhere. We sustain the server costs and development through minimal, non-intrusive advertising displayed on the site. You will never be asked for a credit card or forced into a subscription.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Do I need to create an account or install an app?
                </h3>
                <p className="text-gray-600 leading-relaxed">No. We value your privacy and convenience. Our tool is entirely web-based. You can achieve {keyword} directly through your web browser (Chrome, Safari, Firefox, etc.) without installing any third-party applications, browser extensions, or creating an account.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Is it legal to use {keyword}?
                </h3>
                <p className="text-gray-600 leading-relaxed">Downloading videos for personal, offline viewing is generally considered acceptable under fair use in many jurisdictions. However, you must respect copyright laws and the intellectual property rights of the creators. You should not re-upload, distribute, or monetize downloaded content without obtaining explicit permission from the original copyright owner.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Where are the downloaded files saved on my device?
                </h3>
                <p className="text-gray-600 leading-relaxed">Files are saved to your device's default download location. On Windows or Mac, this is usually the "Downloads" folder. On Android devices, it is the "Downloads" folder or your Gallery app. On iPhones and iPads, files are saved to the "Files" app, from which you can easily save them to your Camera Roll.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Can I download videos from private TikTok accounts?
                </h3>
                <p className="text-gray-600 leading-relaxed">No. Our system respects the privacy settings established by TikTok users. We can only extract and download videos that are publicly available. If an account is set to private, our servers cannot access the video data to process the download.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#fe0979]" />
                  Is there a limit to how many videos I can download?
                </h3>
                <p className="text-gray-600 leading-relaxed">There are no strict limits on the number of videos you can download. You can use our tool for {keyword} as many times as you need. However, we ask users to be reasonable to ensure server stability for everyone.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm mt-12">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Have more questions?</h3>
              <p className="mb-6 text-gray-600 text-lg">The best way to understand is to try it out for yourself. It takes less than 10 seconds.</p>
              <Link to="/" className="text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 text-lg">
                <Download className="w-6 h-6" />
                Go to Homepage to Download Now
              </Link>
            </div>
          </section>

        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 mt-20">
        <div className="max-w-5xl mx-auto text-center">
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
          <p className="text-sm mb-6">The ultimate tool for {keyword}. Fast, free, and secure.</p>
          <div className="pt-8 border-t border-gray-800 text-sm">
            <p>&copy; {new Date().getFullYear()} Savevideotik. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
