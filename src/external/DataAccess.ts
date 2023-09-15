import axios from 'axios';
import {BookDto} from '../dtos/book.dto';
class DataAccess {

  static async getAvailableSeats(flightId: number, date: string) {
    const result = await axios.get(`${process.env['DATA_ACCESS_API_URL']}/flight/${flightId}/get-seats/${date}`);
    if (result.status != 200) {
      throw 'An error occured with the DataAccess API';
    }
    return result.data.seats;
  }
  static async createBook(book: BookDto)  {
    return await axios.post(`${process.env['DATA_ACCESS_API_URL']}/book`, { book });
  }
  static async getBookingHistory(userId: number) {
    return await axios.get(`${process.env['DATA_ACCESS_API_URL']}/booking-history/${userId}`);

  }
}

export default DataAccess;