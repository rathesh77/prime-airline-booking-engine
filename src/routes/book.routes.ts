import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import BookService from '../services/book.service';
import {BookDto} from '../dtos/book.dto';
import HttpErrorHandling from '../errorHandling/HttpErrorHandling';

const router = express.Router();

const bookMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { book }  = req.body;
  if (book.userId === undefined || book.flightId === undefined || book.date === undefined) {
    res.status(400);
    res.send(HttpErrorHandling.invalidPayload());
    return;
  }
  req.body.book = {...book};
  next();
};

router.post('/book', bookMiddleware, async (req: Request, res: Response) => {
  const bookRequest = req.body.book;
  console.log(bookRequest);
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

router.get('/booking-history', (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const bookingHistory = BookService.getBookingHistory(userId);
    res.send(bookingHistory);
  } catch (e) {
    res.send(400);
    res.send(e);
  }
});


export default router;