import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import BookService from '../services/book.service';
import {BookDto} from '../dtos/book.dto';
import HttpErrorHandling from '../errorHandling/HttpErrorHandling';

const router = express.Router();

const createBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const book : BookDto = req.body.book;
  if (book.userId === undefined || book.flightId === undefined || book.date === undefined) {
    res.status(400);
    res.send(HttpErrorHandling.invalidPayload());
    return;
  }
  req.body.book = {...book};
  next();
};

const cancelBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bookingId : number = req.body.book;
  if (bookingId === undefined) {
    res.status(400);
    res.send(HttpErrorHandling.invalidPayload());
    return;
  }
  req.body.book = bookingId;
  next();
};

router.post('/book', createBookMiddleware, async (req: Request, res: Response) => {
  const bookRequest = req.body.book;
  try {
    const book = await BookService.createBook(bookRequest);
    if (!book) {
      res.status(409);
      res.send({
        'code': 'NO_AVAILABLE_SEATS',
        'message': 'There is no available seats for this flight.'
      });
      return;
    }
    res.send(book);
  } catch (e) {
    res.status(400);
    res.send(e);
    return;
  }

});

router.get('/booking-history', async (req: Request, res: Response) => {
  try {
    const userId = +req.query.userId!;
    console.log(userId)
    const bookingHistory = await BookService.getBookingHistory(userId);
    console.log(bookingHistory)
    res.send(bookingHistory);
  } catch (e) {
    res.send(400);
    res.send(e);
  }
});

router.post('/cancel-book', cancelBookMiddleware, async (req: Request, res: Response) => {
  const bookRequest = req.body.book;
  try {
    const status = await BookService.cancelBook(bookRequest);
    res.sendStatus(status);
  } catch (e) {
    res.status(400);
    res.send(e);
    return;
  }

});

export default router;