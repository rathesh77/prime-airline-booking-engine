import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import bookRouter from './routes/book.routes';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();

const port: number = process.env['PORT'] ? +process.env['PORT'] :  8082;

app.use(bodyParser.json());

app.use(bookRouter);

app.get('/healthcheck', (_, res: Response) => {
  res.send('alive');
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});