import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { getEnv, getServerPort } from './helpers/env.helper';
import { logger } from './helpers/logger.helper';
import { globalErrorHandlerMiddleware } from './middlewares/global-error-handler.middleware';
import { connectToDb } from './db/db-connect';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api', routes);
app.use(globalErrorHandlerMiddleware);
app.use('/api/static', express.static(path.join(__dirname, '/../static')));

app.get('/', async (req, res) => {
  res.send('Hello world!!!');
});

const port = getServerPort();

app.listen(port, async () => {
  const serverStartedMessage = `Server listening on port ${port}!`;
  logger.info(`ENV: ${getEnv()}`);
  logger.info(serverStartedMessage);
  await connectToDb();
});
