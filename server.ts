import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to fetch TikTok video data
  app.post("/api/download", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Using tikwm.com API for TikTok downloads
      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.code === 0) {
        const makeAbsolute = (url: string) => {
          if (!url) return url;
          if (url.startsWith('http')) return url;
          return `https://www.tikwm.com${url.startsWith('/') ? '' : '/'}${url}`;
        };

        res.json({
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
  });

  // API route to proxy file downloads
  app.get("/api/proxy-download", async (req, res) => {
    try {
      const { url, filename } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "URL is required" });
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      
      const name = filename ? String(filename) : "download";
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);

      // Stream the response body to the client
      if (response.body) {
        // @ts-ignore - Node.js fetch body is a ReadableStream
        const { Readable } = await import("stream");
        // @ts-ignore
        Readable.fromWeb(response.body).pipe(res);
      } else {
        res.status(500).json({ error: "Empty response body" });
      }
    } catch (error) {
      console.error("Proxy Download Error:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicit SPA fallback for development
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const fs = await import('fs');
        let template = fs.readFileSync('index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static("dist"));
    // SPA fallback for production
    const path = await import("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
