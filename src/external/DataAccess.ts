import axios from 'axios';
import {BookDto} from '../dtos/book.dto';
const DATA_ACCESS_API_URL = "http://localhost:8080"
class DataAccess {


  static async createBook(book: BookDto)  {
    return await axios.post(`${process.env['DATA_ACCESS_API_URL']}/book`, { book });
  }
  static async getBookingHistory(userId: number) {
    return await axios.get(`${DATA_ACCESS_API_URL}/booking-history/${userId}`);

  }
}

export default DataAccess;