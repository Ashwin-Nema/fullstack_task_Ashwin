import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import morgan from './config/morgan';
import routes from './routes';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import { createServer } from 'node:http';
import { StatusCodes } from 'http-status-codes';
import config from './config/config';
import { Server } from 'socket.io';
import { Message } from './models';
import { messageService } from './services';

const redis = require('redis');
const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on('connect', () => {
  console.log('Connected to Redis');
});
client.on('error', (err: any) => console.log('Redis Client Error', err));

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/', routes);

// jwt authentication

// limit repeated failed requests to auth endpoints

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.frontEndUrl,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('add', async (message: string) => {
    let key = await client.get('FULLSTACK_TASK_Ashwin');
    if (!key) {
      key = JSON.stringify([]);
    }
    key = JSON.parse(key);
    key.push(message);
    if (key.length > 3) {
      const messages = key.map((item: string) => ({ text: item }));
      await Message.insertMany(messages);
      key = [];
    }
    const allMessages = await messageService.getAllTasks();
    const convertedKey = key.map((item: string) => ({ text: item }));
    io.emit('new_message_list', [...allMessages, ...convertedKey]);
    key = JSON.stringify(key);

    client.set('FULLSTACK_TASK_Ashwin', key);
  });
});

export default {
  app: server,
  client,
};
