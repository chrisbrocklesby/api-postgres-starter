import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes.js';

const app = express();

app.disable('x-powered-by');
app.use(cors({ exposedHeaders: ['x-session-id'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../client/public'));
app.use(cookieParser(process.env.COOKIE_KEY));

routes(app);

app.listen(process.env.PORT, () => console.log('API Server running... 🌎 🚀'));
