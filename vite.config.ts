import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

function generateLandingPages() {
  return {
    name: 'generate-landing-pages',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;
      
      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      
      const landingPages = [
        'save-video-tiktok', 'download-tiktok-video', 'tiktok-mp3-download',
        'download-without-watermark', 'tiktok-downloader', 'download-tiktok-hd',
        'download-tiktok-4k', 'save-tiktok-video', 'how-to-download-tiktok-video',
        'tiktok-video-downloader-mp4', 'download-tiktok-pc', 'download-tiktok-iphone',
        'download-tiktok-android', 'best-tiktok-downloader', 'tiktok-link-downloader',
        'download-tiktok-stories', 'download-tiktok-slideshow', 'download-private-tiktok',
        'tiktok-downloader-online', 'download-tiktok-music'
      ];
      
      landingPages.forEach(slug => {
        const dir = path.join(distDir, slug);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const canonicalUrl = `https://www.savevideotik.com/${slug}`;
        const newHtml = indexHtml.replace(
          '<link rel="canonical" href="https://www.savevideotik.com" />',
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
        fs.writeFileSync(path.join(dir, 'index.html'), newHtml);
      });
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), generateLandingPages()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
