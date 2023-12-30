import express from "express";
import { createServer as createViteServer } from 'vite';
import apiRoutes from './routes/api.js'; 
import 'dotenv/config';

async function createServer() {
  
  const app = express();
  
  // This is so we can parse JSON payloads:
  app.use(express.json());
  
  // API routes will be used below:
  app.use('/api', apiRoutes);

  // Only use Vite in development:
  if (process.env.NODE_ENV !== 'production') {
    // This creates a Vite server in middleware mode.
    // The 'html' mode is designed to serve the index.html on all non-file requests,
    // which is useful for Single Page Applications that perform client-side routing.
    const vite = await createViteServer({
      server: { middlewareMode: 'html' }
    });
    // The Vite server middlewares are added to the Express application. This means
    // that when we run our server in development, Vite will handle requests for
    // assets and serve them with HMR (Hot Module Replacement) and other development features.
    app.use(vite.middlewares);
  } else {
    // In production, instead of using Vite, you serve the static files directly.
    app.use(express.static('dist'));
  }

  // It will fetch PORT info from our .env file or default to 3000
  // This is helpful for development phase and if this goes on production
  const PORT = process.env.PORT || 3000;

  // Interpolation would avoid us to hardcode the port which is helpful for post-development:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}

createServer();

