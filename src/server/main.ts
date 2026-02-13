import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import indexRouter from "../routes/index.js";
import listRouter from "../routes/list.js";

async function bootstrap() {
  const app = express();
  const PORT = 3000;

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: './src/client',
    publicDir: path.resolve(process.cwd(), 'public')
  });

  app.set('views', path.join(path.resolve(process.cwd(), 'src/views')));
  app.set('view engine', 'ejs');
  app.use(vite.middlewares)
  app.use(express.static(path.resolve(process.cwd(), 'public')))
  app.use('/', indexRouter);
  app.use('/list', listRouter);

  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
  });
}

bootstrap();
