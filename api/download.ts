import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers just in case
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code === 0) {
      const makeAbsolute = (url: string) => {
        if (!url) return url;
        if (url.startsWith('http')) return url;
        return `https://www.tikwm.com${url.startsWith('/') ? '' : '/'}${url}`;
      };

      res.status(200).json({
        title: data.data.title,
        thumbnail: makeAbsolute(data.data.cover),
        play: makeAbsolute(data.data.play),
        hdplay: makeAbsolute(data.data.hdplay || data.data.play),
        music: makeAbsolute(data.data.music),
        author: data.data.author?.nickname || 'tiktok_user',
      });
    } else {
      res.status(400).json({ error: "Failed to fetch video. Please check the URL." });
    }
  } catch (error) {
    console.error("Download API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
