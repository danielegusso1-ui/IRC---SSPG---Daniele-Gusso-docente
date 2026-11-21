import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Server-side AI summarization endpoint using @google/genai
  app.post('/api/summarize', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        res.status(503).json({
          error:
            'Chiave API Gemini non configurata nel server. Verifica la variabile GEMINI_API_KEY nelle impostazioni.',
        });
        return;
      }

      const body = req.body as {
        title?: string;
        content?: string;
        contextLabel?: string;
      };

      const title = typeof body?.title === 'string' ? body.title.trim() : '';
      const content = typeof body?.content === 'string' ? body.content.trim() : '';
      const contextLabel =
        typeof body?.contextLabel === 'string' ? body.contextLabel.trim() : 'Insegnamento della Religione Cattolica';

      if (!content || content.length < 15) {
        res.status(400).json({
          error: 'Il testo da riassumere è troppo breve o mancante.',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = [
        'Istruzione obbligatoria: riassumi esclusivamente in italiano e mantieni un linguaggio chiaro, semplice, coinvolgente e adatto a studenti di scuola media (Scuola Secondaria di Primo Grado, 11-14 anni).',
        'Struttura il riassunto in modo conciso: una breve frase introduttiva (1-2 righe) seguita da 3 o 4 punti chiave facili da ricordare per lo studio.',
        'Non aggiungere commenti su te stesso o premesse inutili: rispondi direttamente con il riassunto.',
        '',
        `Contesto: ${contextLabel}`,
        title ? `Titolo: ${title}` : '',
        '',
        'Contenuto da riassumere:',
        content.slice(0, 12000),
      ]
        .filter(Boolean)
        .join('\n');

      const generateWithRetry = async () => {
        const delaysMs = [600, 1400];
        let lastError: unknown = null;
        for (let attempt = 0; attempt <= delaysMs.length; attempt++) {
          try {
            return await ai.models.generateContent({
              model: 'gemini-4-hydrogen',
              contents: prompt,
              config: {
                systemInstruction:
                  'Sei un docente esperto di Insegnamento della Religione Cattolica (IRC) nella scuola media italiana. Riassumi sempre in italiano corretto, rispettoso, chiaro e accessibile a studenti di 11-14 anni.',
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.LOW,
                },
              },
            });
          } catch (err: unknown) {
            lastError = err;
            const errStatus = (err as { status?: number })?.status;
            const isTransient = errStatus === 503 || errStatus === 429;
            if (!isTransient || attempt === delaysMs.length) {
              throw err;
            }
            await new Promise((resolve) => setTimeout(resolve, delaysMs[attempt]));
          }
        }
        throw lastError;
      };

      const response = await generateWithRetry();

      const summary = response.text?.trim();
      if (!summary) {
        res.status(502).json({
          error: 'Il modello AI non ha restituito un riassunto valido. Riprova tra poco.',
        });
        return;
      }

      res.json({ summary });
    } catch (error: unknown) {
      const errObj = error as { status?: number; message?: string };
      const status = typeof errObj?.status === 'number' ? errObj.status : 500;
      const rawMessage =
        errObj?.message || 'Errore durante la generazione del riassunto AI.';
      const friendlyMessage =
        status === 503 || status === 429
          ? 'Il servizio AI è momentaneamente molto richiesto. Riprova tra qualche secondo.'
          : rawMessage;
      res.status(status >= 400 && status < 600 ? status : 500).json({
        error: friendlyMessage,
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
