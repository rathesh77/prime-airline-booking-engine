import axios from 'axios';
import BookDto from '../dtos/book.dto';

class DataAccess {

  static async createBook(book: BookDto) {
    return await axios.post(`${process.env['DATA_ACCESS_API_URL']}/book`, { book });
  }
  static async getBookingHistory(userId: number) {
    try { 
      return await axios.get(`${process.env['DATA_ACCESS_API_URL']}/booking-history`, { params: { userId: userId }});
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  static async cancelBook(bookingId: number) {
    return await axios.post(`${process.env['DATA_ACCESS_API_URL']}/cancel-book`, { bookingId });
  }
}

export default DataAccess;