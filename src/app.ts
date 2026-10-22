import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { notFound, errorHandler } from './middlewares/error.middleware';

export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
