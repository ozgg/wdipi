import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function bootstrap() {
  const app = express();
  const PORT = 3000;

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: './src/client',
    publicDir: path.resolve(process.cwd(), 'public')
  });

  app.use(vite.middlewares);
  app.use(express.static(path.resolve(process.cwd(), 'public')));

  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
  });
}

bootstrap();
