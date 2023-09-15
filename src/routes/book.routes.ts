import express from 'express';
import { Request, Response } from 'express';
import BookService from '../services/book.service';
import {BookDto} from '../dtos/book.dto';

const router = express.Router();

router.post('/book', async (req: Request, res: Response) => {
  console.log(req.body);
  let book: BookDto | null = {
    userId: 0,
    flightId: 0,
    date: ''
  };
  try {
    book = await BookService.createBook(req.body);
  } catch (e) {
    res.status(400);
    res.send(e);
    return;
  }
  if (!book) {
    res.status(409);
    res.send({
      'code': 'NO_AVAILABLE_SEATS',
      'message': 'There is no available seats for this flight.'
    });
    return;
  }
  res.send(book);
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