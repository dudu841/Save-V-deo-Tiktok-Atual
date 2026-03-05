import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
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
      // Vercel serverless functions support streaming by piping the response body
      // We can use the native stream API
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
}
