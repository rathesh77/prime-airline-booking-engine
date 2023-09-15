import {BookDto} from '../dtos/book.dto';
import BaseClass from '../errorHandling/DataAccessErrorHandling';
import DataAccess from '../external/DataAccess';
class BookService {

  static async createBook(bookRequest: BookDto): Promise<BookDto | null | never> {
    const { flightId, date } = bookRequest;
    try {
      if (await DataAccess.getAvailableSeats(flightId, date) == 0)
        return null;

      const book: BookDto = bookRequest;
      const response = await DataAccess.createBook(book);

      if (response.status != 200)
        throw BaseClass.customError(response.data);

      return response.data as BookDto;
    } catch (e) {
      throw BaseClass.genericError();
    }
  }

  static async getBookingHistory(userId: number): Promise<BookDto[] | never> {
    try {
      const response = await DataAccess.getBookingHistory(userId);

      if (response.status != 200)
        throw BaseClass.customError(response.data);

      return response.data;
    } catch (e) {
      throw BaseClass.genericError();
    }
  }
}

export default BookService;
