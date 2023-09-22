import BookDto from '../dtos/book.dto';
import BookingHistoryDto from '../dtos/bookingHistory.dto';
import BaseClass from '../errorHandling/DataAccessErrorHandling';
import DataAccess from '../external/DataAccess';
class BookService {

  static async createBook(bookRequest: BookDto): Promise<BookDto | null | never> {
    try {
      const book: BookDto = bookRequest;
      const response = await DataAccess.createBook(book);

      if (response.status != 200)
        throw BaseClass.customError(response.data);

      return response.data as BookDto;
    } catch (e) {
      throw BaseClass.genericError();
    }
  }

  static async getBookingHistory(userId: number): Promise<BookingHistoryDto[]> {
    try {
      const response = await DataAccess.getBookingHistory(userId);

      if (response.status != 200)
        throw BaseClass.customError(response.data);

      return response.data;
    } catch (e) {
      throw BaseClass.genericError();
    }
  }

  static async cancelBook(bookingId: number): Promise<number> {
    try {
      const response = await DataAccess.cancelBook(bookingId);

      if (response.status != 202)
        throw BaseClass.customError(response.data);

      return response.status;
    } catch (e) {
      throw 400;
    }
  }
}

export default BookService;
