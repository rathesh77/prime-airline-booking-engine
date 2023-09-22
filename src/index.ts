import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import bookRouter from './routes/book.routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Application = express();

const port: number = process.env['PORT'] ? +process.env['PORT'] :  8082;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());

app.use(bookRouter);

app.get('/health', (_, res: Response) => {
  res.sendStatus(200);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});