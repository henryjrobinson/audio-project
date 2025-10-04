import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import { errorHandler, notFound } from './middleware/error.middleware';

const app: Express = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: config.cors.origin, credentials: true })); // CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/v1', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;